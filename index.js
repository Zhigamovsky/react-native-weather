import 'react-native-gesture-handler'
import React from 'react'
import {AppRegistry} from 'react-native'
import Geocoder from 'react-native-geocoding';

import {name as appName} from './app.json'
import { Application } from './src/navigation'
import KEYS from './src/config/keys'
import { Log } from './src/utils'
import ContextCollector from './src/contexts/context-collector'

Geocoder.init(KEYS.google_api_key, { language : 'en' })

/**
 * Hide all console.log in release build
 * @call Log.setEnvironmentRelease(); 
 */
Log.setEnvironmentDebug()

AppRegistry.registerComponent(appName, () => {
    return (
      () => (
        <ContextCollector>
          <Application />
        </ContextCollector>
      )
    )
  })
  