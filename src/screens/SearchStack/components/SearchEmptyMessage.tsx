import React from 'react'
import styled from 'styled-components/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS, FLEX, FONT } from '../../../utils'

export const SearchEmptyMessage: React.FC = () => (
  <Container>
    <Ionicons 
      name='list' 
      size={35} 
      color={COLORS.main}
    />
    <Message>
      Weather list is empty
    </Message>
  </Container>
)

const Container = styled.View`
  width: 100%;
  height: 100px;
  ${FLEX('column')}
`

const Message = styled.Text`
  ${FONT('Regular', 20, COLORS.main)}
  padding: 10px;
`