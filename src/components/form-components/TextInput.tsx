import React from 'react'
import { StyleSheet, TextInput as NativeTextInput } from 'react-native'

import { COLORS, DefaultShadow, SheetFONT } from '../../utils'
import { TextInputProps } from './types'

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onValueChange,
  nativeProps,
  placeholder = '',
  overrideStyle = {}
}) => (
  <NativeTextInput 
    value={value}
    onChangeText={onValueChange}
    placeholder={placeholder}
    style={[textStyle, inputStyle, overrideStyle]}
    { ...nativeProps}
  />
)


export const { textStyle, inputStyle } = StyleSheet.create({
  textStyle: {
    ...SheetFONT('Regular', 15)
  },
  inputStyle: {
    backgroundColor: COLORS.background,
    height: 35,
    paddingVertical: 7,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 15,
    ...DefaultShadow
  }
})