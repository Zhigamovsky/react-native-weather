import { CustomWeatherItemType, WeatherDayType } from "../types/entities/weather"
import { TempWeatherByDays } from "../types/navigation"

interface WeekDayTranslaterProp {
  [dayIndex: number]: string
}

interface GetWeatherDividedByDaysFunc {
  (): TempWeatherByDays
}

const jsCoreDateCreator = (dateString: string) => { 
  let [firstPart, ...otherParts] = dateString.split(/[\s-:]/)  
  firstPart = (parseInt(firstPart, 10) - 1).toString()  
  // @ts-expect-error
  return new Date(...[firstPart, ...otherParts])
}

const WeekDayTranslater: WeekDayTranslaterProp = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

interface GroupWeatherByDayFunc {
  (weatherList: WeatherDayType[]): CustomWeatherItemType[]
}

const currentDay = new Date().getDay()

export const getWeekDay = (date: Date) => {
  return WeekDayTranslater[date.getDay()]
}

export const calcAvgTemp = (weathers: WeatherDayType[]) => {
  if(!weathers.length) return 0
  let totalTemperature = 0
  weathers.map(weather => totalTemperature += weather.main.temp)
  return totalTemperature / weathers.length
}

const emptyDay = {
  avg: 0,
  weekDay: ''
}

export const getWeatherDividedByDays: GetWeatherDividedByDaysFunc = () => ({
  [currentDay]: {
    ...emptyDay,
    list: []
  },
  [currentDay + 1]: {
    ...emptyDay,
    list: []
  },
  [currentDay + 2]: {
    ...emptyDay,
    list: []
  },
  [currentDay + 3]: {
    ...emptyDay,
    list: []
  },
  [currentDay + 4]: {
    ...emptyDay,
    list: []
  },
  [currentDay + 5]: {
    ...emptyDay,
    list: []
  }
})

export const groupWeatherByDay: GroupWeatherByDayFunc = (newWeatherList) => {
  try {
    let weatherByDays = getWeatherDividedByDays()
    let weatherList: CustomWeatherItemType[] = []
    newWeatherList.map(weather => {
      let date = jsCoreDateCreator(weather.dt_txt)
      weatherByDays[date.getDay()].list.push(weather)
      weatherByDays[date.getDay()].weekDay = getWeekDay(date)
    })
    Object.entries(weatherByDays).map(weather => {
      const [key, value] = weather as [string, CustomWeatherItemType]
      weatherByDays[Number(key)].avg = Math.round(calcAvgTemp(value.list))
      weatherList.push(value)
    })
    return weatherList
  }
  catch(e){
    return []
  }
}