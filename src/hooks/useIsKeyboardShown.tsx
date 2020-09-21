import React, { useEffect, useState } from 'react'
import { EmitterSubscription, Keyboard, Platform } from 'react-native'

import { UseIsKeyboardShownHook } from './types'

export const useIsKeyboardShown: UseIsKeyboardShownHook = () => {
  let keyboardEventListeners: EmitterSubscription[] = []
  
  const [isShown, toggleVisibility] = useState<boolean>(false)

  const KeyboardEvents = {
    onShow: () => {
      toggleVisibility(true)
    },
    onHide: () => {
      toggleVisibility(false)
    }
  }

  const subscribeAtKeyboardEvents = () => {
    if(Platform.OS == 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidHide', KeyboardEvents.onHide),
        Keyboard.addListener('keyboardDidShow', KeyboardEvents.onShow)
      ]
    }
    else if(Platform.OS == 'ios') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardWillHide', KeyboardEvents.onHide),
        Keyboard.addListener('keyboardWillShow', KeyboardEvents.onShow),
      ]
    }
  }

  const unsubscribeFromKeyboardEvents = () => {
    keyboardEventListeners.forEach((eventListener) => eventListener.remove());
  }

  useEffect(() => {
    subscribeAtKeyboardEvents()
    return unsubscribeFromKeyboardEvents
  }, [])

  return isShown
}