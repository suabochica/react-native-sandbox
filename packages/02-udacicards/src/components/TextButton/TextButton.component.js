import React, { PureComponent } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import { ORANGE_WHITE, MONTECARLO, MANATEE } from '../../utils/colors'

const Button  = styled.TouchableOpacity`
  align-items: center;
  background-color: ${MONTECARLO};
  border-radius: 4px;
  flex: 1;
  justify-content: center;
  margin: 8px 0;
  max-height: 35px;
  padding: 0 8px;
`

const ButtonText = styled.Text`
  color: ${ORANGE_WHITE};
  font-size: 18px;
`

class TextButton extends PureComponent {
  render () {
    const { children, onPress, style = {} } = this.props

    return (
      <Button
        onPress={onPress}
        style={[style]}
      >
        <ButtonText>{children}</ButtonText>
      </Button>
    )
  }
}

export default TextButton