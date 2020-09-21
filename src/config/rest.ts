import { LatLng } from "react-native-maps"
import KEYS from "./keys"

export const URL = {
  weather_api_url: `https://api.openweathermap.org/data/2.5/`
}

export const WEATHER_QUERIES_URL = {
  weather_by_city_name: (city: string, daysPerHours: number) => `${URL.weather_api_url}forecast?q=${city}&cnt=${daysPerHours}&units=metric&appid=${KEYS.weather_api_key}`,
  weather_by_coords: (coords: LatLng, daysPerHours: number) => `${URL.weather_api_url}forecast?lat=${coords.latitude}&lon=${coords.longitude}&cnt=${daysPerHours}&units=metric&appid=${KEYS.weather_api_key}`,
}

export const QUERIES_URL = {
  ...WEATHER_QUERIES_URL
}