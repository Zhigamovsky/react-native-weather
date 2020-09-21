import React from 'react'
import styled from 'styled-components/native'

import { DividerProps } from './types'

export const Divider: React.FC<DividerProps> = ({
  height = 20,
  width = '100%',
  background = '#FFFFFF00'
}) => {
  return (
    <Container 
      {...{height, width, background}}
    />
  )
}

const Container = styled.View<DividerProps>`
  ${({height, width, background}) => `
    height: ${height}px;
    width: ${typeof width == 'number' ? width+'px' : width};
    background: ${background};
  `}
`;