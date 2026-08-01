import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

export const DECK_QUIZ_NOTIFICATION = 'udacicards:quiznotification'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export function clearLocalNotification () {
  return AsyncStorage.removeItem(DECK_QUIZ_NOTIFICATION)
    .then(() => Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification () {
  return {
    title: 'Hey! Udacicards Time',
    body: "Don't forget to take your test for today!",
    sound: true,
  }
}

export function setLocalNotification () {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    })
  }

  AsyncStorage.getItem(DECK_QUIZ_NOTIFICATION)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Notifications.requestPermissionsAsync()
          .then(({ status } = {}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              Notifications.scheduleNotificationAsync({
                content: createNotification(),
                trigger: {
                  type: Notifications.SchedulableTriggerInputTypes.DAILY,
                  hour: 20,
                  minute: 0,
                  repeats: true,
                },
              })

              AsyncStorage.setItem(DECK_QUIZ_NOTIFICATION, JSON.stringify(true))
            }
          })
      }
    })
}
