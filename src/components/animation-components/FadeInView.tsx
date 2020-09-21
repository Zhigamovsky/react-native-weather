import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'

import { FadeInViewProps } from './types'

export const FadeInView: React.FC<FadeInViewProps> = ({
  style = {}, 
  children = null, 
  duration = 500, 
  state = {
    from: 0, 
    to: 1
  },
  skipAnimationsTo
}) => {
  const [fadeAnim] = useState(new Animated.Value(state.from));

  useEffect(() => {
    Animated.timing(fadeAnim,
      {
        toValue: state.to,
        duration: skipAnimationsTo?.value == state.to ? 0 : duration,
        useNativeDriver: true
      }
    ).start();
  }, [state.to])

  return (
    <Animated.View                 
      style={{
        opacity: fadeAnim,
        ...style
      }}
    >
      {children}
    </Animated.View>
  );
}
