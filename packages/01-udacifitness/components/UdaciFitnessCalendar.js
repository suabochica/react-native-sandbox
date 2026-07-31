import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { timeToString } from '../utils/helpers'
import { purple, white } from '../utils/colors'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Replicates XDate#toString("MMMM d, yyyy") from the original package.
function formatLongDate (dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number)
  return `${MONTHS[month - 1]} ${day}, ${year}`
}

// The original package limited the calendar to the last 183 days.
function getMinDate () {
  return timeToString(new Date().setDate(new Date().getDate() - 183))
}

/**
 * Drop-in replacement for the abandoned 2018 `udacifitness-calendar`
 * package (a fork of Wix's react-native-calendars Agenda).
 *
 * NOTE: implemented with <Calendar /> + <FlatList /> instead of the
 * stock <Agenda />: Agenda's class-era componentDidUpdate/setState/scroll
 * cycle loops into "Maximum update depth exceeded" with modern React.
 * This version owns the list rendering entirely, so there are no
 * third-party update cycles.
 *
 * Preserves the original contract with History:
 *   renderItem(entry, formattedDate, key)  key = 'yyyy-MM-dd'
 *   renderEmptyDate(formattedDate)
 *   items = { 'yyyy-MM-dd': entry | null }
 */
export default class UdaciFitnessCalendar extends Component {
  state = {
    selected: timeToString()
  }

  onDayPress = (day) => {
    this.setState({ selected: day.dateString })
  }

  // Days with data get a dot; the selected day is highlighted.
  // Recomputed only when the items reference changes.
  markedDates (selected) {
    if (this.props.items !== this.lastItems) {
      this.lastItems = this.props.items
      this.baseMarkedDates = Object.keys(this.props.items).reduce((acc, key) => {
        if (this.props.items[key]) {
          acc[key] = { marked: true }
        }
        return acc
      }, {})
    }

    return {
      ...this.baseMarkedDates,
      [selected]: { ...(this.baseMarkedDates[selected] || {}), selected: true }
    }
  }

  // Rows for the list, newest day first — the original agenda opened on
  // today, so today sits at the top without any scroll math.
  rows () {
    if (this.props.items !== this.lastRowsItems) {
      this.lastRowsItems = this.props.items
      this.cachedRows = Object.keys(this.props.items)
        .sort()
        .reverse()
        .map((key) => ({ key, entry: this.props.items[key] }))
    }

    return this.cachedRows
  }

  renderRow = ({ item }) => {
    const { renderItem, renderEmptyDate } = this.props
    const formattedDate = formatLongDate(item.key)

    return item.entry
      ? renderItem(item.entry, formattedDate, item.key)
      : renderEmptyDate(formattedDate)
  }

  render () {
    return (
      <FlatList
        data={this.rows()}
        keyExtractor={(item) => item.key}
        renderItem={this.renderRow}
        initialNumToRender={10}
        ListHeaderComponent={
          <Calendar
            current={timeToString()}
            minDate={getMinDate()}
            maxDate={timeToString()}
            onDayPress={this.onDayPress}
            markedDates={this.markedDates(this.state.selected)}
            theme={{
              calendarBackground: white,
              selectedDayBackgroundColor: purple,
              selectedDayTextColor: white,
              todayTextColor: purple,
              dotColor: purple,
            }}
          />
        }
      />
    )
  }
}
