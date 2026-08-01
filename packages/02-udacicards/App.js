import React, { Component } from 'react'
import { Provider }  from 'react-redux'
import { View } from 'react-native'
import { createStore } from 'redux'

import rootReducer from './src/redux/reducers'
import MainNavigator from './src/navigation'
import CardsStatusBar from './src/components/CardsStatusBar/CardsStatusBar.component'
import { setLocalNotification } from './src/utils/notification';
import { MONTECARLO } from './src/utils/colors';

const store = createStore(rootReducer)

export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CardsStatusBar
            backgroundColor={MONTECARLO}
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}


