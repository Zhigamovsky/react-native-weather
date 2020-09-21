import { ViewStyle } from "react-native"

export interface FadeInViewProps {
  style?: ViewStyle, 
  duration?: number, 
  state?: {
    from: number, 
    to: number 
  },
  skipAnimationsTo?: {
    type: 'to',
    value: 0
  }  
}