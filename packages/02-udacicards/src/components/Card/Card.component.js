import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Answer from './Answer.component'
import Question from './Question.component'
import { TextButton } from '../'
import { answerCard } from '../../redux/actions/cards.action'
import { LIMA, POMERGRANATE } from '../../utils/colors'

const Wrapper = styled.View`
  align-items: center;
  background-color: transparent;
  flex: 1;
  justify-content: center;
`

class Card extends Component {
  state = {
    toggleAnswer: false
  }

  handleToggleToAnswerView() {
    const { toggleAnswer } = this.state

    toggleAnswer === false
      ? this.setState({toggleAnswer: true})
      : this.setState({toggleAnswer: false})
  }

  render () {
    const { dispatch } = this.props
    const { question, answer } = this.props.question
    const { toggleAnswer } = this.state

    return (
      <Wrapper>
        <View>
          { toggleAnswer
            ? <Answer
                answer={answer}
                handleShowQuestion={this.handleToggleToAnswerView.bind(this)}
              />
            : <Question
                question={question}
                handleShowAnswer={this.handleToggleToAnswerView.bind(this)}
              />
          }
        </View>
        <View>
          <TextButton
            onPress={() => dispatch(answerCard(true))}
            style={{backgroundColor: LIMA}}
          >
            Correct
          </TextButton>
          <TextButton
            onPress={() => dispatch(answerCard(false))}
            style={{backgroundColor: POMERGRANATE}}
          >
            Incorrect
          </TextButton>
        </View>
      </Wrapper>
    )
  }
}

export default connect()(Card)