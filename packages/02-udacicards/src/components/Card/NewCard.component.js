import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native'

import { addCardToDeck } from '../../utils/api'
import { addCard } from '../../redux/actions/decks.action'
import { ORANGE_WHITE, RANGOON_GREEN, MANATEE, JET_STREAM } from '../../utils/colors'
import { TextButton } from '../'

const Wrapper = styled.View`
  flex: 1;
  background-color: ${JET_STREAM};
`

const CardSection = styled.KeyboardAvoidingView`
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

const CardTextInput = styled.TextInput`
  border-color: ${MANATEE}
  height: 38px;
  padding-left: 5px;
  margin-bottom: 0;
`

class NewCard extends Component {
  state = {
    questionText: '',
    answerText: '',
  }

  handleCreateCardSubmit = () => {
    const { dispatch, navigation } = this.props
    const { questionText, answerText } = this.state
    const { deck } = this.props.route.params

    if ((questionText !== '' && answerText !== '')) {
      const card = {
        question: questionText,
        answer: answerText,
      }

      addCardToDeck(card, deck)
        .then(() => {
          dispatch(addCard(card, deck))
          this.setState({questionText: '', answerText: ''})

          navigation.goBack();
        })
    }
  }

  onChangeQuestionText = (questionText) => {
    this.setState({questionText})
  }

  onChangeAnswerText = (answerText) => {
    this.setState({answerText})
  }

  render () {
    const { answerText, questionText } = this.state

    return(
      <Wrapper>
        <CardSection>
          <CardTextLabel>Type the question of your new card, please</CardTextLabel>
          <CardTextInput
            value={questionText}
            onChangeText={(this.onChangeQuestionText)}
            placeholder='Question'
          />
          <CardTextLabel>Type the answer of your new question, please</CardTextLabel>
          <CardTextInput
            value={answerText}
            onChangeText={this.onChangeAnswerText}
            placeholder='Answer'
          />
          <TextButton
            onPress={this.handleCreateCardSubmit}
          >
            Create Card
          </TextButton>
        </CardSection>
      </Wrapper>
    )
  }
}

export default connect()(NewCard)