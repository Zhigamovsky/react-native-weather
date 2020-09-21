import { AxiosRequestConfig, Method, AxiosError, AxiosResponse } from "axios"

import { RequestData } from "../requests/common"
import { WeatherByCity, WeatherByCoords } from "../requests/weather-requests"
import { WeatherByCityResponseData, WeatherByCoordsResponseData } from "../responses/weather-responses"

export type FetchConfig = {
  skipLoader?: boolean,
  skipErrorHandler?: boolean
}

export type FetchNativeConfig = {
  identifier: string
}

export type HttpDefaultRequestOptions = {
  config?: FetchConfig
}

export type ErrorConstructor = {
  error: AxiosError,
  code: number,
  message: string,
  skip?: number[]
};

export type ErrorTranslater = {
  (
    error: AxiosError,
    skip?: number[]
  ): ErrorConstructor
}

export type HttpMakeFetchMethod = {
  (
    axiosConfig: AxiosRequestConfig,
    config?: FetchConfig,
    nativeConfig?: FetchNativeConfig,
    callback?: (request: {
      [parameter: string]: any
    }) => void
  ): Promise<AxiosResponse>
}

export type HttpQuery = {
  method: Method,
  url: string,
  body?: {
    [parameter: string]: any
  },
  callback: (response: {
    [parameter: string]: any
  }) => void
}
  
export type HttpContextProps = React.Context<{
  actions: HttpContextActions;
}>

export interface HttpContextAction<T = any,U = any> {
  (request: HttpDefaultRequestOptions & T)
    : Promise<AxiosResponse<U>>
}

/**
 * `Weather HTTP Actions`
 * 
 * @method GET_WEATHER_BY_CITY() - get weather data by city name
 */

export interface HttpContextWeatherActions {
  GET_WEATHER_BY_CITY: HttpContextAction<RequestData<WeatherByCity>, WeatherByCityResponseData>,
  GET_WEATHER_BY_COORDS: HttpContextAction<RequestData<WeatherByCoords>, WeatherByCoordsResponseData>
}


/**
 * `Collection of all HTTP Actions`
 */  
export interface HttpContextActions 
  extends HttpContextWeatherActions {
  
}