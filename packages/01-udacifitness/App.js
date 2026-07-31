import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Constants from 'expo-constants'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import reducer from './reducers'
import EntryDetail from './components/EntryDetail'
import AddEntry from './components/AddEntry'
import History from './components/History'
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers'
import { purple, white } from './utils/colors'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeTabs () {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Platform.OS === 'ios' ? purple : white,
        tabBarStyle: {
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          height: 56,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 1,
          shadowRadius: 6,
        }
      }}
    >
      <Tab.Screen
        name='History'
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => <Ionicons name='bookmarks' size={30} color={color} />
        }}
      />
      <Tab.Screen
        name='AddEntry'
        component={AddEntry}
        options={{
          tabBarLabel: 'Add Entry',
          tabBarIcon: ({ color }) => <FontAwesome name='plus-square' size={30} color={color} />
        }}
      />
      <Tab.Screen
        name='Live'
        component={Live}
        options={{
          tabBarLabel: 'Live',
          tabBarIcon: ({ color }) => <Ionicons name='speedometer' size={30} color={color} />
        }}
      />
    </Tab.Navigator>
  )
}

function UdaciStatusBar ({ backgroundColor, ...props }) {
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

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name='Home'
                component={HomeTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='EntryDetail'
                component={EntryDetail}
                options={({ route }) => {
                  const { entryId } = route.params
                  const year = entryId.slice(0, 4)
                  const month = entryId.slice(5, 7)
                  const day = entryId.slice(8)

                  return {
                    title: `${month}/${day}/${year}`,
                    headerTintColor: white,
                    headerStyle: {
                      backgroundColor: purple,
                    },
                  }
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}
