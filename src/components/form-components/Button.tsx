// @ts-expect-error
import Ripple from 'react-native-material-ripple'
import React from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Platform } from 'react-native'

import { COLORS, FONT } from '../../utils'
import { ButtonProps, ButtonTemplatesType, ButtonTemplate } from './types'

const ButtonTemplates: ButtonTemplatesType = {
  'fill-lightblue': {
    slug: 'fill-lightblue',
    backgroundColor: COLORS.statusbar,
    disableBackgroundColor: COLORS.secondary,
    fontColor: '#FFFFFF',
  },
  'fill-grey': {
    slug: 'fill-grey',
    backgroundColor: '#E6E6E6',
    disableBackgroundColor: '#E1E1E1',
    fontColor: '#000000',
  }
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  height = 50,
  heightUnit = 'px',
  width = 100,
  widthUnit = '%',
  template = 'fill-lightblue',
  roundedValues = [10, 10, 10, 10],
  nativeProperties = {},
  containerStyle = {},
  titleStyle = {},
  disabled = false
}) => {

  const { rippleStyle } = StyleSheet.create({
    rippleStyle: {
      elevation: disabled ? 1 : 2,
      shadowRadius: disabled ? 1 : 2,
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      padding: 10,
      backgroundColor: disabled ? ButtonTemplates[template].disableBackgroundColor : ButtonTemplates[template].backgroundColor,
      width: widthUnit == '%' ? width + widthUnit : width,
      height: heightUnit == '%' ?  height + heightUnit : height,
      borderTopLeftRadius: roundedValues[0],
      borderTopRightRadius: roundedValues[1],
      borderBottomRightRadius: roundedValues[2],
      borderBottomLeftRadius: roundedValues[3],
      flexDirection: 'row',
      justifyContent: 'center'
    }
  })

  const _onPress = () => {
    !disabled && onPress()
  }

  return (
    <Ripple 
      style={[rippleStyle, containerStyle]} 
      rippleSize={500} 
      rippleDuration={300}
      onPress={_onPress}
      rippleColor={'#353535FF'}
    >
      <Title 
        style={titleStyle}
        template={ButtonTemplates[template]}
        disabled={disabled}
      >
        {title}
      </Title>
    </Ripple>
  )
}

const Title = styled.Text<{
  template: ButtonTemplate,
  disabled: boolean
}>`
  ${Platform.OS == 'ios' ? `padding-top: 5px;` : ``}
  text-align: center;
  ${({template, disabled}) => FONT('Bold', 16, template.fontColor + `${disabled ? '70' : ''}`)}
`;