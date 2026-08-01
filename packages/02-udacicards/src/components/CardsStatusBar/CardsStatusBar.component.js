import React, { PureComponent } from 'react'
import { StatusBar, View } from 'react-native'
import Constants from 'expo-constants'

class CardsStatusBar extends PureComponent {
  render () {
    const { backgroundColor, ...props} = this.props

    return (
      <View
      style={{
        backgroundColor,
        height: Constants.statusBarHeight,
      }}
    >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
    )
  }
}

export default CardsStatusBar