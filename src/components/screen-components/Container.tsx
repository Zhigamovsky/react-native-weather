import React from 'react'
import styled from 'styled-components/native'

import { ContainerPageProps } from './types'
import { FLEX, COLORS } from '../../utils'
import Header from './Header'

const Container: React.FC<ContainerPageProps> = ({
  scrollable = false,
  background = COLORS.background,
  children,
  containerStyle = {},
  scrollviewStyle = {},
  containerScrollviewStyle = {},
  headerProps = null
}) => (
  <>
    { headerProps && <Header {...headerProps} /> }
    <SafeView 
      background={background} 
      style={containerStyle}
    >
    {
      scrollable ? (
        <SafeScrollView
          style={scrollviewStyle}
          contentContainerStyle={containerScrollviewStyle}
        >
          {children}
        </SafeScrollView>
      ) : children
    }
    </SafeView>
  </>
)

const SafeView = styled.SafeAreaView<{
  background: string
}>`
  flex: 1;
  ${FLEX('column', 'center', 'flex-start')}
  ${({background}) => `background-color: ${background};`}
  border-radius: 20px;
  border: 0px solid ${COLORS.secondary};
  border-top-width: 3px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 3px;
  margin-top: 10px;
`

const SafeScrollView = styled.ScrollView`
  width: 100%;
`

export default Container;