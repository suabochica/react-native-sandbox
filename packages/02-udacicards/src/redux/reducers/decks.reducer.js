import { ADD_CARD, ADD_DECK, DELETE_DECK, RECEIVE_DECKS } from '../actions/types.action'

export default function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck,
      }
    case DELETE_DECK :
      return {
        ...state,
        ...action.deck,
      }
    case ADD_CARD :
      state[action.deck].questions.push(action.question)
      return {
        ...state
      }
    default :
      return state
  }
}
