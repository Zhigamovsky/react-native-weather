import { TextInputProps as NativeTextInputProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

export interface DividerProps {
  height?: number | string,
  width?: number | string,
  background?: string
}

type OmitTextInputProps = 'value' | 'onChangeText' | 'placeholder'

export interface TextInputProps {
  value: string,
  onValueChange: (value: TextInputProps['value']) => void,
  placeholder?: string,
  overrideStyle?: ViewStyle | TextStyle,
  nativeProps?: Omit<NativeTextInputProps, OmitTextInputProps>
}

export type ButtonTemplateVariants = 'fill-lightblue' | 'fill-grey';

export type ButtonTemplate = {
  slug: ButtonTemplateVariants,
  backgroundColor: string,
  fontColor: string,
  disableBackgroundColor: string
}

export type ButtonTemplatesType = {
  [mode in ButtonTemplateVariants]: ButtonTemplate
}

export interface ButtonStyledProps {
  height?: number,
  heightUnit?: 'px' | '%',
  width?: number,
  widthUnit?: 'px' | '%',
  template?: ButtonTemplateVariants,
  roundedValues?: [number, number, number, number]
}

export interface ButtonProps extends ButtonStyledProps {
  title: string,
  onPress: () => void,
  nativeProperties?: TouchableOpacityProps,
  containerStyle?: ViewStyle,
  titleStyle?: TextStyle,
  disabled?: boolean
}