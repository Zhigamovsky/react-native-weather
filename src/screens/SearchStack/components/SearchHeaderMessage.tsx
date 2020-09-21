import React from 'react'
import styled from 'styled-components/native'

import { FONT } from '../../../utils'
import { SearchHeaderMessageProps } from './types'

export const SearchHeaderMessage: React.FC<SearchHeaderMessageProps> = ({
  title
}) => (
  <Title>{title}</Title>
)

const Title = styled.Text`
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  ${FONT()}
`