import { Animated, EasingFunction, ViewStyle } from 'react-native'
import { TextInputProps } from '../../../components/form-components/types'
import { GoogleAddressType } from '../../../types/entities/place'
import { CustomWeatherItemType } from '../../../types/entities/weather'

export interface SearchContainerProps {
  onSearch: (searchValue: string) => void
}

export interface SearchButtonProps {
  onPress: () => void,
  overrideContainerStyle?: ViewStyle,
  renderIcon?: (color: string, size: number) => React.ReactChild
}

export interface WeatherDayItemProps {
  weatherData: CustomWeatherItemType,
  delayMounting?: number
}

export interface SearchHeaderMessageProps {
  title: string
}

export interface GooglePlacesAutocompleteProps {
  value: string,
  onValueChange: (value: string) => void,
  onComplexValueChange?: (complexValue: GoogleAddressType) => void,
  onFocus?: () => void,
  onBlur?: () => void,
  isFocused: boolean,
  nativeRef?: any,
  inputProps?: TextInputProps['nativeProps'],
  overrideInputStyle?: TextInputProps['overrideStyle']
}

export interface ButtonAnimationFunc {
  (
    toValue: number, 
    value: Animated.Value, 
    duration?: number, 
    easing?: EasingFunction
  ): void
}

export interface ButtonAnimationState {
  scale: Animated.Value,
  radius: Animated.Value,
  opacity: Animated.Value
}