import React , { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Card, TextButton } from '../'
import { resetCards } from '../../redux/actions/cards.action'
import { ORANGE_WHITE, RANGOON_GREEN, MANATEE, JET_STREAM } from '../../utils/colors'


const Wrapper = styled.View`
  flex: 1;
  background-color: ${JET_STREAM};
`

const CardSection = styled.KeyboardAvoidingView`
  align-items: center;
  flex: 1;
  background-color: ${ORANGE_WHITE};
  border-radius: 10px;
  box-shadow: 0 2px 2px ${MANATEE};
  justify-content: center;
  padding: 30px 30px 0 30px;
`

const CardTextLabel = styled.Text`
  color: ${RANGOON_GREEN};
  font-size: 24px;
  line-height: 32;
`

const CardTextParagraph = styled.Text`
  color: ${MANATEE};
  font-size: 18px;
  line-height: 32;
`

class Cards extends Component {
  render () {
    const { deck } = this.props.route.params
    const { correct, currentQuestion, decks, dispatch, navigation } = this.props
    const { questions } = decks[deck]
    const score = Math.round((correct / questions.length) * 100)

    if ( questions.length > 0 && currentQuestion === questions.length) {
      return (
        <Wrapper>
          <CardSection>
            <CardTextLabel>
              Done!
            </CardTextLabel>
            <CardTextParagraph>You got {score} in this test</CardTextParagraph>
            <TextButton
              onPress={() =>
                dispatch(resetCards())
              }
            >
              Restart Cards
            </TextButton>
            <TextButton
              onPress={() =>
                navigation.goBack()
              }
            >
              Back to Deck
            </TextButton>
          </CardSection>
        </Wrapper>
      )
    }

    return (
      <Wrapper>
        <CardSection>
          <CardTextParagraph>{currentQuestion + 1} / {questions.length}</CardTextParagraph>
          <Card question={questions[currentQuestion]}/>
        </CardSection>
      </Wrapper>
    )
  }
}

function mapStateToProps (state) {
  return {
    correct: state.cards.correct,
    currentQuestion: state.cards.currentQuestion,
    decks: state.decks,
  }
}

export default connect(mapStateToProps)(Cards)