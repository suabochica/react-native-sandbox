
import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

import { startCards } from '../../redux/actions/cards.action'
import { ORANGE_WHITE, MONTECARLO, MANATEE } from '../../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../../utils/notification'
import { TextButton } from '..';

const CenterView = styled.View`
  align-items: center;
  background: ${ORANGE_WHITE};
  flex: 1;
  justify-content: center;
`

const TextTitle = styled.Text`
  background-color: transparent;
  color: ${MONTECARLO};
  font-size: 34px;
  text-align: center;
`

const TextCardsQuantity = styled.Text`
  background-color: transparent;
  color: ${MANATEE};
  font-size: 18px;
  text-align: center;
`

class Deck extends Component {
  render () {
    const { decks } = this.props
    const { deckItem } = this.props.route.params
    const { title, questions } = decks[deckItem]

    return (
      <CenterView>
        <View>
          <TextTitle>{title}</TextTitle>
          <TextCardsQuantity>{questions.length} Cards</TextCardsQuantity>
        </View>
        <TextButton onPress={() => {
          this.props.navigation.navigate(
            'NewCard',
            {
              deck: deckItem,
            }
          )
        }}>
          New Card
        </TextButton>
        {questions.length > 0 && (
          <TextButton onPress={() => {
            this.props.dispatch(startCards())
            this.props.navigation.navigate(
              'Cards',
              {
                deck: deckItem,
              }
            )
            clearLocalNotification().
              then(setLocalNotification)
          }}>
            Start Test
          </TextButton>
        )}
      </CenterView>
    )
  }
}

function mapStateToProps ({decks}) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Deck)