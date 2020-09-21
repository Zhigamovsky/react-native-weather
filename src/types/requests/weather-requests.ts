import { LatLng } from "react-native-maps"

export interface WeatherByCity {
  city: string,
  days: number
}

export interface WeatherByCoords {
  coords: LatLng,
  days: number
}