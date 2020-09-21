import React from 'react'
import styled from 'styled-components/native'
import { StyleSheet, StatusBarProps } from 'react-native'
import { Header as NativeHeader } from 'react-native-elements'

import { FONT } from '../../utils'
import { HeaderPageProps } from './types'
import { BackButton } from '../../components/nav-components'
import { COLORS } from '../../utils/css'

const statusBarProp: StatusBarProps = {
  barStyle: 'dark-content',
  backgroundColor: COLORS.statusbar,
  animated: true
}

const Header: React.FC<HeaderPageProps> = ({
  title, 
  navigation,
  enableBackButton = false,
  ContentCenter = null,
  containerStyle = {}
}) => {
  
  const renderLeftContent = () => {
    if(enableBackButton) {
      return <BackButton onPress={navigation.goBack} />
    }
  }
  
  const renderCenterContent = () => {
    if(ContentCenter) {
      return ContentCenter
    }
    else {
      return <Title>{title}</Title>
    }
  }

  return (
    <NativeHeader
      statusBarProps={statusBarProp}
      containerStyle={[headerStyle, containerStyle]}
      style={{
        backgroundColor: 'purple'
      }}
      centerComponent={renderCenterContent()}
      placement={ContentCenter ? 'left' : 'center'}
      leftComponent={renderLeftContent()}
    />
  )
}

const { headerStyle } = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    
  }
})

const Title = styled.Text`
  margin-top: 5px;
  ${FONT('Bold', 20, COLORS.main)}
`

export default Header;