import { ANSWER_CARD, RESET_CARDS, START_CARDS } from '../actions/types.action'

const initialScoreState = {
  correct: 0,
  currentQuestion: 0,
  cardStarted: false,
}

export default function cards (state = initialScoreState, action) {
  switch (action.type) {
    case ANSWER_CARD :
      if (action.correct)
        state.correct += 1

      state.currentQuestion += 1

      return {
        ...state,
      }
    case RESET_CARDS :
      return {
        ...initialScoreState
      }
    case START_CARDS :
      return {
        ...state,
        cardStarted: true
      }
    default :
      return state
  }
}
