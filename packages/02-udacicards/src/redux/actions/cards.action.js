import { ANSWER_CARD, RESET_CARDS, START_CARDS } from './types.action'

export function answerCard (cardAnswer) {
  return {
    type: ANSWER_CARD,
    correct: cardAnswer,
  }
}

export function resetCards () {
  return {
    type: RESET_CARDS,
  }
}

export function startCards () {
  return {
    type: START_CARDS,
  }
}