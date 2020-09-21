import React, { useEffect, useState } from 'react'
import { Marker } from 'react-native-maps'
import styled from 'styled-components/native'
import { Animated, Easing, StyleSheet } from 'react-native'

import { MarkerAnimationState, StartCustomAnimationFunc, WeatherMarkerProps } from './types'
import { COLORS, DefaultShadow, FLEX, SheetFLEX } from '../../../utils'
import { ANIMATION_MARKER } from '../config'
import { MapImages } from '../../../utils/images'

export const WeatherMarker: React.FC<WeatherMarkerProps> = ({
  coordinates
}) => {
  const [animation] = useState<MarkerAnimationState>(ANIMATION_MARKER.defaultMarkerAnimationState)

  const startAnimationEffect: StartCustomAnimationFunc = (
    toValues, 
    value, 
    duration = ANIMATION_MARKER.TIMING, 
    easing = Easing.inOut(Easing.ease),
    isLoop = true
  ) => {
    const getAnimatedSequence = () => {
      let animations: Array<Animated.CompositeAnimation> = []
      toValues.map(toValue => {
        animations.push(
          Animated.timing(
            value, {
              toValue,
              easing,
              duration: duration,
              useNativeDriver: true,
            }
          ),
        )
      })
      return animations
    }

    if(isLoop){
      Animated.loop(
        Animated.sequence(
          getAnimatedSequence()
        )
      ).start()
    }
    else {
      let [ animation ] = getAnimatedSequence()
      animation.start()
    }
  }

  const Effects = {
    start: () => {
      startAnimationEffect(ANIMATION_MARKER.PULSE_VALUES, animation.scale)
      startAnimationEffect(ANIMATION_MARKER.PULSE_VALUES, animation.opacity)
      startAnimationEffect(ANIMATION_MARKER.IMG_OPACITY_VALUES, animation.opacityImage)
      startAnimationEffect(ANIMATION_MARKER.IMG_TRANSLATE_VALUES, animation.translateImage)
    },
    interpolate: (v: Animated.Value) => {
      return v.interpolate(ANIMATION_MARKER.defaultInterpolateValues)
    },
    get restart() {
      return this.start
    }
  }
  useEffect(() => {
    Effects.restart()
  }, [coordinates])

  return (
    <Container>
      <Marker 
        style={{
          height: 100,
          width: 100,
          overflow: 'visible'
        }}
        coordinate={coordinates}
      >
        <AnimationContainer>
          <Animated.Image 
            source={MapImages.weatherIcon}
            style={[markerImageStyle, {
              opacity: animation.opacityImage,
              transform: [{
                translateY: Effects.interpolate(animation.translateImage)
              }]
            }]}
          />
          <Animated.View
            style={[markerContainerStyle, {
              transform: [{
                scale: Effects.interpolate(animation.scale),
              }, { 
                scaleX: 1.5 
              }, { 
                scaleY: 0.3
              }],
              opacity: animation.opacity
            }]}
          >
            <Animated.View 
              style={[shadowStyle, {
                transform: [{
                  scale: Effects.interpolate(animation.scale)
                }]
              }]}
            />
          </Animated.View>
        </AnimationContainer>
      </Marker>
    </Container>
  )
}

const { 
  markerContainerStyle, 
  markerImageStyle, 
  shadowStyle 
} = StyleSheet.create({
  markerContainerStyle: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF00',
    borderTopColor: COLORS.background,
    borderLeftColor: COLORS.secondary,
    borderRightColor: COLORS.secondary,
    borderBottomColor: COLORS.statusbar,
    borderWidth: 5,
    borderBottomWidth: 13,
    borderRadius: 25,
    ...DefaultShadow,
    ...SheetFLEX(),
  },
  markerImageStyle: {
    height: 35,
    width: 35,
    position: 'absolute',
    top: -5,
    resizeMode: 'contain'
  },
  shadowStyle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: '#35353535'
  }
})

const Container = styled.View`
  width: 50px;
  height: 50px;
`

const AnimationContainer = styled.View`
  ${FLEX('column')}
  width: 100px;
  height: 70px;
  margin-top: 50px;
  position: relative;
`