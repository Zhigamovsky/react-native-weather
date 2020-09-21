import { Animated, EasingFunction } from "react-native"
import { LatLng } from "react-native-maps"

import { PlaceType } from "../../../types/entities/place"

export interface WeatherCityDataProps {
  place: PlaceType,
  onPressPlace: (place: PlaceType) => void,
  onClosePlace: () => void
}

export interface WeatherMarkerProps {
  coordinates: LatLng
}

export interface MarkerAnimationState {
  scale: Animated.Value,
  translateImage: Animated.Value,
  opacityImage: Animated.Value,
  opacity: Animated.Value
}

export interface StartCustomAnimationFunc {
  (
    toValue: number[], 
    value: Animated.Value, 
    duration?: number, 
    easing?: EasingFunction,
    isLoop?: boolean
  ): void
}