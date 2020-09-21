import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, Easing, Vibration } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, SheetFLEX, DefaultShadow } from '../../../utils'
import { ButtonAnimationFunc, ButtonAnimationState, SearchButtonProps } from './types'
import { BUTTON_ANIMATION, SEARCH_BUTTON_WIDTH } from './config'

export const SearchButton: React.FC<SearchButtonProps> = ({
  onPress,
  renderIcon = null,
  overrideContainerStyle = {}
}) => {
  const [animation] = useState<ButtonAnimationState>({
    scale: new Animated.Value(0),
    radius: new Animated.Value(100),
    opacity: new Animated.Value(0)
  })

  const startAnimationEffect: ButtonAnimationFunc = (
    toValue, value, 
    duration = BUTTON_ANIMATION.timing, 
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
    showAll: () => {
      startAnimationEffect(10, animation.radius)
      startAnimationEffect(1, animation.scale)
      startAnimationEffect(1, animation.opacity)
    },
    pressInRounde: () => {
      startAnimationEffect(30, animation.radius, BUTTON_ANIMATION.timing / 3)
      startAnimationEffect(0.9, animation.scale, BUTTON_ANIMATION.timing / 3)
    },
    pressOutRoude: () => {
      startAnimationEffect(10, animation.radius, BUTTON_ANIMATION.timing / 5, Easing.elastic(2))
      startAnimationEffect(1, animation.scale, BUTTON_ANIMATION.timing / 4, Easing.elastic(2))
    }
  }

  const PressableEvents = {
    onPress: onPress,
    onLongPress: () => Vibration.vibrate(5),
    onPressIn: AnimationEvents.pressInRounde,
    onPressOut:  AnimationEvents.pressOutRoude
  }

  useEffect(() => {
    AnimationEvents.showAll()
  }, [])

  const _renderIcon = () => {
    const color = 'white'
    const size = SEARCH_BUTTON_WIDTH * 0.6
    if(renderIcon) {
      return renderIcon(color, size)
    }
    else return (
      <Ionicons 
      name='search' 
      size={size} 
      color={color}
    />
    )
  }

  return (
    <Animated.View
      style={[containerStyle, overrideContainerStyle, {
        transform: [{
          scale: animation.scale.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          })
        }],
      }]}
    >
      <TouchableOpacity
        onPressIn={PressableEvents.onPressIn}
        onPressOut={PressableEvents.onPressOut}
        onPress={PressableEvents.onPress}
        onLongPress={PressableEvents.onLongPress}
        activeOpacity={1}
        style={touchStyle}
      >
        {_renderIcon()}
      </TouchableOpacity>
    </Animated.View> 
  )
}

const { touchStyle, containerStyle } = StyleSheet.create({
  touchStyle: {
    backgroundColor: COLORS.main,
    borderRadius: SEARCH_BUTTON_WIDTH / 2 * 0.7,
    width: SEARCH_BUTTON_WIDTH,
    aspectRatio: 1,
    ...SheetFLEX(),
    ...DefaultShadow
  },
  containerStyle: SheetFLEX()
})
