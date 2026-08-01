import React from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { ORANGE_WHITE, MONTECARLO } from '../utils/colors'
import {
  Deck,
  Decks,
  NewCard,
  NewDeck,
  Card,
  Cards,
} from '../components'

const Tab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator()

function Tabs () {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Platform.OS === 'ios' ? MONTECARLO : ORANGE_WHITE,
        tabBarStyle: {
          backgroundColor: Platform.OS === 'ios' ? ORANGE_WHITE : MONTECARLO,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}
    >
      <Tab.Screen
        name='Decks'
        component={Decks}
        options={{ tabBarLabel: 'Decks' }}
      />
      <Tab.Screen
        name='NewDeck'
        component={NewDeck}
        options={{ tabBarLabel: 'Add Deck' }}
      />
    </Tab.Navigator>
  )
}

const headerOptions = {
  headerTintColor: ORANGE_WHITE,
  headerStyle: {
    backgroundColor: MONTECARLO,
  },
}

export default function MainNavigator () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Deck'
          component={Deck}
          options={({ route }) => ({
            ...headerOptions,
            title: `${route.params.title}`
          })}
        />
        <Stack.Screen
          name='NewCard'
          component={NewCard}
          options={{
            ...headerOptions,
            title: 'Add Card'
          }}
        />
        <Stack.Screen
          name='Card'
          component={Card}
          options={{
            ...headerOptions,
            title: 'Card'
          }}
        />
        <Stack.Screen
          name='Cards'
          component={Cards}
          options={{
            ...headerOptions,
            title: 'Cards'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
