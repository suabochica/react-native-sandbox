import { combineReducers } from 'redux'

import decks from './decks.reducer'
import cards from './cards.reducer'

export default combineReducers({
  decks,
  cards,
})