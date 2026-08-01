import React, { PureComponent } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import styled from 'styled-components'

import { RANGOON_GREEN, MONTECARLO } from '../../utils/colors'

const CardOption = styled.View`
  align-items: center;
`

const CardTextLabel = styled.Text`
  color: ${RANGOON_GREEN};
  font-size: 30px;
  line-height: 32;
  text-align: center;
`

const CardTextTouchable = styled.Text`
  color: ${MONTECARLO};
  font-size: 18px;
  line-height: 20;
`

class Question extends PureComponent {
  render () {
    const { question, handleShowAnswer } = this.props

    return (
      <CardOption>
        <CardTextLabel>{ question }</CardTextLabel>
        <TouchableHighlight
          onPress={handleShowAnswer}
        >
          <CardTextTouchable>Show Answer</CardTextTouchable>
        </TouchableHighlight>
      </CardOption>
    )
  }
}

export default Question