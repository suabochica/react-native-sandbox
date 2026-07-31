import React, { Component } from 'react'
import { ActivityIndicator, Animated, Text, TouchableOpacity, StyleSheet, View  } from 'react-native'
import * as Location from 'expo-location'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { calculateDirection } from '../utils/helpers'

export default class Live extends Component {
  state = {
    coords: {
      altitude: 1,
      speed: 1,
    },
    status: null,
    direction: '',
    bounceValue: new Animated.Value(1),
  }

  componentDidMount () {
    Location.getForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status === 'granted') {
          return this.setLocation()
        }

        this.setState(() => ({ status }))
      })
      .catch((error) => {
        console.warn('Error getting Location permission:', error)

        this.setState(() => ({ status: 'undetermined' }))
      })
  }

  askPermision = () => {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status === 'granted') {
          return this.setLocation()
        }

        this.setState(() => ({ status }))
      })
      .catch((error) => {
        console.warn('Error asking Location permission:', error)
      })
  }

  setLocation = () => {
    Location.watchPositionAsync({
      enableHighAccuracy: true,
      timeInterval: 1,
      distanceInterval: 1,
    }, ({ coords }) => {
      const newDirection = calculateDirection(coords.heading)
      const { direction, bounceValue } = this.state

      if (newDirection !== direction) {
        Animated.sequence([
          Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
          Animated.spring(bounceValue, { friction: 4, toValue: 1.04 }),
        ]).start()
      }

      this.setState(() => ({
        coords,
        status: 'granted',
        direction: newDirection,
      }))
    })
  }

  render() {
    const { status, coords, direction, bounceValue } = this.state

    if (status === null) {
      return <ActivityIndicator style={{marginTop: 30}}/>
    }

    if (status === 'denied') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied your location. You can fix this by visiting your settings and enabling location services for this app.
          </Text>
        </View>
      )
    }

    if (status === 'undetermined') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>You need to enable location services for this app.</Text>
          <TouchableOpacity style={styles.button} onPress={this.askPermision}>
            <Text style={styles.buttonText}>Enable</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.directionContainer}>
          <Text style={styles.header}>You are heading</Text>
          <Animated.Text
            style={[styles.direction, {transform: [{scale: bounceValue}]}]}>
            {direction}
          </Animated.Text>
        </View>
        <View style={styles.metricContainer}>
          <View style={styles.metric}>
            <Text style={[styles.header, {color: white}]}>
              Altitude
            </Text>
            <Text style={[styles.subHeader, {color: white}]}>
              {Math.round(coords.altitude * 3.2808)} Feet
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.header, {color: white}]}>
              Speed
            </Text>
            <Text style={[styles.subHeader, {color: white}]}>
              {(coords.speed * 2.2369).toFixed(1)} MPH
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: purple,
    borderRadius: 5,
    margin: 20,
    padding: 10,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: 'center',
  },
  metricContainer: {
    backgroundColor: purple,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metric: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flex: 1,
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10,
    paddingBottom: 15,
    paddingTop: 15,
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
})