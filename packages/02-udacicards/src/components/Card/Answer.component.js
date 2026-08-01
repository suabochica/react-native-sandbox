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

class Answer extends PureComponent {
  render () {
    const { answer, handleShowQuestion } = this.props

    return (
      <CardOption>
        <CardTextLabel>{ answer }</CardTextLabel>
        <TouchableHighlight
          onPress={handleShowQuestion}
        >
          <CardTextTouchable>Show Question</CardTextTouchable>
        </TouchableHighlight>
      </CardOption>
    )
  }
}

export default Answer