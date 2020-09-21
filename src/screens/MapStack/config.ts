import { Animated } from "react-native"

export const MAP_INITIAL_REGION = {
  latitude: 50.3946291,
  longitude: 30.4852942,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
}

export const ANIMATION_MARKER = {
  TIMING: 700,
  PULSE_VALUES: [1, 0.3],
  IMG_OPACITY_VALUES: [1, 0.8],
  IMG_TRANSLATE_VALUES: [-5, -12],
  defaultInterpolateValues: {
    inputRange: [0, 1],
    outputRange: [0, 1],
  },
  defaultMarkerAnimationState: {
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
    translateImage: new Animated.Value(1),
    opacityImage: new Animated.Value(0)
  }
}