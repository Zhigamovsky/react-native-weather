import { LatLng } from "react-native-maps"

export interface PlaceType {
  coordinates: LatLng,
  displayTitle: string
}

export interface GoogleAddressType {
  description: string,
  formatted_address: string,
  geometry: {
    location?: {
      lat: number,
      lng: number
    }
  }
}