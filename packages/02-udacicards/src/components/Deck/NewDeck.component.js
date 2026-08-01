import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native'

import { addDeck } from '../../redux/actions/decks.action'
import { saveDeckTitle } from '../../utils/api'
import { ORANGE_WHITE, RANGOON_GREEN, MANATEE, JET_STREAM } from '../../utils/colors'
import { TextButton } from '../'

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${JET_STREAM};
`

const DeckTitleContainer = styled.View`
  min-height: 120px;
`

const DeckSection = styled.View`
  flex: 1;
  background-color: ${ORANGE_WHITE};
  border-radius: 10px;
  box-shadow: 0 2px 2px ${MANATEE};
  justify-content: center;
  padding: 30px 30px 0 30px;
`

const DeckTextTitle = styled.Text`
  color: ${RANGOON_GREEN};
  font-size: 24px;
  line-height: 32;
`

const DeckTextInput = styled.TextInput`
  border-color: ${MANATEE}
  height: 38px;
  padding-left: 5px;
  margin-bottom: 0;
`

class NewDeck extends Component {
  state = {
    title: ''
  }

  handleCreateDeckSubmit = () => {
    const { dispatch, navigation } = this.props
    const { title } = this.state
    const deck = {
      [title]: {
        title,
        questions: [],
      }
    }

    saveDeckTitle(deck)
      .then(() => {
        this.setState({title: ''})
        dispatch(addDeck(deck))
        navigation.goBack()
      })
  }

  onChangeTitleText = (title) => {
    this.setState({title})
  }

  render () {
    const { title } = this.state

    return(
      <Wrapper>
        <DeckSection>
          <DeckTitleContainer>
            <DeckTextTitle>Type the title of your new deck, please</DeckTextTitle>
          </DeckTitleContainer>
          <DeckTextInput
            value={title}
            onChangeText={(title) => this.setState({title})}
            placeholder='Deck Title'
          />
          <TextButton
            onPress={this.handleCreateDeckSubmit}
          >
            Create Deck
          </TextButton>
        </DeckSection>
      </Wrapper>
    )
  }
}

export default connect()(NewDeck)