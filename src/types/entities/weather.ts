export interface WeatherType {
  cod: number,
  message: any,
  cnt: number,
  list: Array<WeatherDayType>,
  city: WeatherCityType
}

export interface WeatherDayType {
  dt: number,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number
  },
  weather: Array<{
    id: number,
    main: string,
    description: string,
    icon: string
  }>,
  clouds: {
    all: any
  },
  wind: {
    speed: 3.3,
    deg: 300
  },
  visibility: number,
  pop: any,
  sys: {
    pod: any
  },
  dt_txt: string
}

export interface WeatherCityType {
  id: number,
  name: string,
  coords: {
    lat: number,
    lon: number
  },
  country: string,
  timesone: number,
  sunrise: number,
  sunset: number
}

export interface CustomWeatherItemType {
  avg: number,
  weekDay: string,
  list: WeatherDayType[]
}