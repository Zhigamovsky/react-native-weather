import { LatLng } from 'react-native-maps'
import { CustomWeatherItemType } from '../types/entities/weather';

export interface UseWeatherByCoordsHook {
  (coordinates: LatLng): {
    isLoadingWeather: boolean,
    weather: CustomWeatherItemType | null,
    coordinates: LatLng
  }
}

export interface UseIsKeyboardShownHook {
  (): boolean
}