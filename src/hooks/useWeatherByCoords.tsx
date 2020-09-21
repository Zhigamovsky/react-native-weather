import React, { useContext, useEffect, useState } from 'react'
import { LatLng } from 'react-native-maps'

import { HttpContext } from '../contexts'
import { CustomWeatherItemType } from '../types/entities/weather'
import { groupWeatherByDay } from '../utils/calc'
import { UseWeatherByCoordsHook } from './types'

export const useWeatherByCoords: UseWeatherByCoordsHook = (coordinates) => {
  const { actions: httpActions } = useContext(HttpContext)
  const [isLoadingWeather, toggleLoadingWeather] = useState<boolean>(false)
  const [weather, setWeather] = useState<CustomWeatherItemType | null>(null)

  const getWeatherByCoords = async (coords: LatLng) => {
    try { 
      toggleLoadingWeather(true)
      let { data: { list: weatherList } } = await httpActions.GET_WEATHER_BY_COORDS({
        data: {
          coords,
          days: 1
        },
        config: {
          skipLoader: true
        }
      }) 
      const [todayWeather] = groupWeatherByDay(weatherList)
      setWeather(todayWeather)
    }
    finally {
      toggleLoadingWeather(false)
    }
  }

  useEffect(() => {
    if(coordinates){
      getWeatherByCoords(coordinates)
    }
  }, [coordinates])

  return {
    isLoadingWeather,
    weather,
    coordinates
  }
}