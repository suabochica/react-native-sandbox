
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { white } from '../utils/colors'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import MetricCard from './MetricCard'
import TextButton from './TextButton'

class EntryDetail extends Component {
  reset = () => {
    const { remove, goBack, entryId } = this.props

    remove()
    goBack()
    removeEntry(entryId)
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render() {
    const { metrics } = this.props
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton style={{margin: 20}} onPress={this.reset}>
          RESET
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    padding: 15,
  },
})

function mapStateToProps (state, { route }) {
  const { entryId } = route.params

  return {
    entryId,
    metrics: state[entryId],
  }
}

function mapDispatchToProps (dispatch, { navigation, route }) {
  const { entryId } = route.params

  return {
    remove: () => dispatch(
      addEntry({
        [entryId]: timeToString() === entryId
          ? getDailyReminderValue()
          : null
      })
    ),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)