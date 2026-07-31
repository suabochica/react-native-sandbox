
import React from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import {purple, white, gray} from '../utils/colors'

export default function UdaciSlider ({ max, unit, step, value, onIncrement, onDecrement }) {
  return (
    <View style={styles.row}>
      {
        Platform.OS === 'ios'
        ? <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.iOSButton, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}
              onPress={onDecrement}
            >
              <Entypo name='minus' size={30} color={'purple'}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iOSButton, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0}]}
              onPress={onIncrement}
            >
              <Entypo name='plus' size={30} color={'purple'}/>
            </TouchableOpacity>
          </View>
        : <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.androidButton}
              onPress={onDecrement}
            >
              <FontAwesome name='minus' size={30} color={'white'}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.androidButton}
              onPress={onIncrement}
            >
              <FontAwesome name='plus' size={30} color={'white'}/>
            </TouchableOpacity>
          </View>
      }
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  androidButton:{
    backgroundColor: purple,
    borderRadius: 2,
    margin: 5,
    padding: 10,
  },
  iOSButton: {
    backgroundColor: white,
    borderColor: purple,
    borderRadius: 4,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  metricCounter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
  },
})