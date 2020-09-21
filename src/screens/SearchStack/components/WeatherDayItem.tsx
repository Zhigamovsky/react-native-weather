import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextStyle, Animated, Easing } from 'react-native'

import { COLORS, DefaultShadow, FLEX, FONT } from '../../../utils'
import { ButtonAnimationFunc, ButtonAnimationState, WeatherDayItemProps } from './types'
import { WEATHER_ITEM_ANIMATION } from './config'

export const textShadowStyle: TextStyle = {
  textShadowOffset: {
    width: 10,
    height: 10
  }
}

export const WeatherDayItem: React.FC<WeatherDayItemProps> = ({
  weatherData,
  delayMounting = 0
}) => {
  const [animation] = useState<ButtonAnimationState>({
    scale: new Animated.Value(0),
    radius: new Animated.Value(100),
    opacity: new Animated.Value(0)
  })

  const startCustomAnimation: ButtonAnimationFunc = (
    toValue, value, 
    duration = WEATHER_ITEM_ANIMATION.timing, 
    easing = Easing.bounce
  ) => {
    Animated.timing(
      value, {
        toValue,
        duration,
        easing,
        useNativeDriver: true
      }
    ).start()
  }

  const AnimationEvents = {
    showAll: (delay?: number) => {
      setTimeout(() => {
        startCustomAnimation(10, animation.radius)
        startCustomAnimation(1, animation.scale)
        startCustomAnimation(1, animation.opacity)
      }, (delay || 0))
    },
    pressInRounde: () => {
      startCustomAnimation(30, animation.radius, WEATHER_ITEM_ANIMATION.timing / 3)
      startCustomAnimation(0.9, animation.scale, WEATHER_ITEM_ANIMATION.timing / 3)
    },
    pressOutRoude: () => {
      startCustomAnimation(10, animation.radius, WEATHER_ITEM_ANIMATION.timing / 5, Easing.elastic(2))
      startCustomAnimation(1, animation.scale, WEATHER_ITEM_ANIMATION.timing / 4, Easing.elastic(2))
    }
  }

  useEffect(() => {
    AnimationEvents.showAll(delayMounting * 1000)
  }, [])

  return (
    <Animated.View 
      style={{
        transform: [{
          scale: animation.scale.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          })
        }],
      }}
    >
      <Container style={DefaultShadow}>
        <MaterialCommunityIcons 
          name='weather-cloudy'
          color={COLORS.main}
          size={35}
        />
        <Title style={textShadowStyle}>{weatherData.weekDay}</Title>
        <Temperature style={textShadowStyle}>{weatherData.avg.toString()}°</Temperature>
      </Container>
    </Animated.View>
  )
}

const Container = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background: ${COLORS.secondary};
  padding: 0 20px;
  ${FLEX('row', 'center', 'space-between')}
`

const Title = styled.Text`
  ${FONT('Bold', 17, 'white')}
  box-shadow: 1px 1px 1px #35353535;
`

export const Temperature = styled(Title)`
  
`