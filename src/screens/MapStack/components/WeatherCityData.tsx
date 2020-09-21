import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLORS, FLEX, FONT } from '../../../utils'
import { WeatherCityDataProps } from './types'
import { textShadowStyle } from '../../SearchStack/components/WeatherDayItem'
import { useWeatherByCoords } from '../../../hooks'
import { SearchButton } from '../../SearchStack/components'
import { FadeInView } from '../../../components/animation-components'

export const WeatherCityData: React.FC<WeatherCityDataProps> = ({
  place, 
  onPressPlace,
  onClosePlace
}) => {
  const { weather, isLoadingWeather } = useWeatherByCoords(place.coordinates)

  const _onPressPlace = () => {
    place && onPressPlace(place)
  }

  return (
    <PlaceContainer>
      <PlaceInformation>
        <SearchButton 
          onPress={onClosePlace}
          renderIcon={(color, size) => (
            <MaterialCommunityIcons 
              name='progress-close'
              { ...{ color, size: size * 1.2}}
            />
          )}
        />
        <PlaceTitle
          lineBreakMode='tail'
          numberOfLines={1}
        >
          { place.displayTitle }
        </PlaceTitle>
      </PlaceInformation>
      <WeatherInformation>
        <SearchButton 
          onPress={_onPressPlace}
          renderIcon={(color, size) => (
            <MaterialCommunityIcons 
              name='weather-cloudy'
              { ...{ color, size}}
            />
          )}
        />
        {
          isLoadingWeather ? (
            <FadeInView duration={100}>
              <ActivityIndicator 
                size='small' 
                color={COLORS.main} 
              />    
            </FadeInView>
            
          ) : (
            <>
              <FadeInView>
                <WeekDay style={textShadowStyle}>
                  {weather?.weekDay || ''}
                </WeekDay>
              </FadeInView>
              <FadeInView>
                <Temperature style={textShadowStyle}>
                  {weather ? `${weather.avg}°` : 'Unrecognized'}
                </Temperature>
              </FadeInView>
            </>
          )
        }
      </WeatherInformation>
    </PlaceContainer>
  )
}

const PlaceContainer = styled.View`
  background: ${COLORS.background};
  position: absolute;
  elevation: 1;
  bottom: -2px;
  left: 0;
  min-height: 80px;
  border-radius: 20px;
  border: 2px solid ${COLORS.secondary};
  padding: 5px;
  width: 100%;
  z-index: 100;
  ${FLEX('column', 'flex-start', 'space-around')}
`

const PlaceTitle = styled.Text`
  ${FONT('SemiBold', 18)}
  height: 100%;
  padding: 0px 10px;
`

const PlaceInformation = styled.View`
  ${FLEX('row', 'flex-start', 'space-between')}
  height: 50%;
  width: 100%;
  padding: 10px;
`

const WeatherInformation = styled.View`
  width: 100%;
  height: 40px;
  padding: 10px;
  ${FLEX('row','center', 'space-between')}
`

const Temperature = styled.Text`
  ${FONT('Bold', 17, COLORS.main)}
  box-shadow: 1px 1px 1px #35353535;
  padding: 0 10px;
`

const WeekDay = styled(Temperature)`

`