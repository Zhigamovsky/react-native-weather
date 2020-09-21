# React Native Weather
* ## **React Native v063.2 without EXPO**
* ## **TypeScript v3.8.3**
* ## **React v16.13.1**
* ## **Axios v0.20**



### Example `React Native` application to display weather by coords and by city name - `react-native-weather`

## To reproduce example you need **Google API Key** and **OpenWeatherMap API Key**

## **You must enable Google iOS Map SDK, Google Android Map SDK, Google Geocoder API, Google Places API** in Google Console and you must have active Billing Account

### You need replace with your Google API Key in:
* ios/RNTest/AppDelegate.m - line 31
* android/app/src/main/AndroidManifest.xml - line 17
* src/config/keys.ts - line 2

### You need replace with your OpenWeatherMap API Key in:
* src/config/keys.ts - line 3

### Then:
* `npm i` - install dependencies
* `npx pod-install` - install CocoaPods dependencies
* `xed -b ios` - to open in XCode and run on iOS Simulator
* `npx react-native run-android` - run on Android Emulator
* `cd android && ./gradlew assembleRelease` - to create debug APK

# Used API:
* Google Maps
* Google Geocoder
* Google API
* Google Autocomplete
* OpenWeatherMap API

# Used React/React Native features:
* functional components
* hooks (useState, useContext, useRef, useEffect)
* custom hooks (useIsKeyboardShown, useWeatherByCoords)
* React Context
* Animated

# Used other packages:
* react-navigation
* react-native-maps
* react-native-modal
* react-native-vector-icons
* axios
* @zhigamovsky/styled-console-log
* styled-components
* ...etc

