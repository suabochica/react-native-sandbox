import AsyncStorage from '@react-native-async-storage/async-storage'

export const DECK_STORAGE_KEY = 'udacicards:deckstorge'

const defaultState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => {
      return JSON.parse(decks)
    })
}

export function getDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => {
      return JSON.parse(decks[title])
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(title))
}

export function addCardToDeck(entry, key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => {
      const results = JSON.parse(decks)

      results[key].questions.push(entry)
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(results))
    })
}
