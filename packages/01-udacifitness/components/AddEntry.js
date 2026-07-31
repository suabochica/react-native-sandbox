import  React, { Component } from 'react'
import { View, StyleSheet ,TouchableOpacity, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import { submitEntry, removeEntry } from '../utils/api'
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification,
} from '../utils/helpers'
import { purple, white } from '../utils/colors'
import { addEntry } from '../actions'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'

function SubmitButton ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iOSSubmitButton : styles.AndroidSubmitButton}
      onPress={onPress}
    >
      <Text style={styles.submitButtonText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}


class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric)

    this. setState( state => {
      const count = state[metric] + step

      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    })

  }

  decrement = metric => {
    this.setState( state => {
      const count = state[metric] - getMetricMetaInfo(metric).step

      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value,
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    // Update Redux
    this.props.dispatch(addEntry({
      [key]: entry
    }))

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    this.toHome()

    // Save to database
    submitEntry({ key, entry })

    // Clear local notification
    clearLocalNotification()
      .then(setLocalNotification)
  }

  reset = () => {
    const key = timeToString()

    // Update Redux
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))

    this.toHome()

    // Update database
    removeEntry(key)
  }

  toHome = () => {
    this.props.navigation.navigate('History')
  }

  render () {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name='happy-outline'
            size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton
            style={{padding: 10}}
            onPress={this.reset}
          >
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <DateHeader date ={(new Date()).toLocaleDateString()}/>
        {
          Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key]
            const value = this.state[key]

            return (
              <View key={key} style={styles.row}>
                {getIcon()}
                {
                  type === 'slider'
                  ? <UdaciSlider
                      value={value}
                      onChange={(value) => this.slide(key, value)}
                      {...rest}
                    />
                  : <UdaciSteppers
                      value={value}
                      onIncrement={() => this.increment(key)}
                      onDecrement={() => this.decrement(key)}
                    />
                }
              </View>
            )
          })
        }
        <SubmitButton onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    padding: 20,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  iOSSubmitButton: {
    backgroundColor: purple,
    borderRadius: 8,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    padding: 10,
  },
  AndroidSubmitButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: purple,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
    marginLeft: 40,
    marginRight: 40,
    padding: 20,
  },
  submitButtonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})

function mapStateToProps (state) {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)
