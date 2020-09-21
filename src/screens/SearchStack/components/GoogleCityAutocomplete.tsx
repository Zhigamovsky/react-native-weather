import React from 'react'
import { GooglePlacesAutocomplete as GooglePlacesNativeAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

import KEYS from '../../../config/keys'
import { COLORS, DefaultShadow, Log, SheetFONT } from '../../../utils'
import { GooglePlacesAutocompleteProps } from './types'
import { textStyle, inputStyle } from '../../../components/form-components/TextInput'
import { GoogleAddressType } from '../../../types/entities/place'
import { useIsKeyboardShown } from '../../../hooks'

export const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  value,
  onValueChange,
  onComplexValueChange = () => {},
  isFocused,
  onFocus = () => {},
  onBlur = () => {},
  inputProps = {},
  overrideInputStyle = {},
  nativeRef = null
}) => {
  const isKeyboardShown = useIsKeyboardShown()

  const Events = {
    onValueChange: (value: string) => {
      onValueChange(value);
    },
    onComplexValueChange: (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
      let complexValue: GoogleAddressType = {
        description: data.description,
        formatted_address: details?.formatted_address || data.description,
        geometry: {
          ...details?.geometry?.location ? {
            location: details.geometry.location
          } : {}
        }
      }
      onComplexValueChange(complexValue)
      Log.hazel('GooglePlaces.onComplexValueChange()', {
        data, details, complexValue
      })
    }
  }

  return (
    <Container
      containerWidth={overrideInputStyle.width || '100%'}
      isKeyboardShown={isKeyboardShown}
    >
      <GooglePlacesNativeAutocomplete
        textInputProps={{
          value: value,
          onChangeText: Events.onValueChange,
          style: [inputStyle, textStyle, overrideInputStyle],
          onFocus,
          onBlur,
          ref: nativeRef,
          ...inputProps
        }}
        defaultValue={value}
        getDefaultValue={() => value}
        value={value}
        onFail={(error) => Log.ruddy(error)}
        placeholder='Type city name'
        minLength={2} 
        autoFocus={false}
        returnKeyType="search" 
        listViewDisplayed={isFocused}
        fetchDetails={true}
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          Events.onValueChange(details?.formatted_address || 'Sumy');
          Events.onComplexValueChange(data, details);
        }}
        query={{
          key: KEYS.google_api_key,
          language: 'en',
          types: '(cities)'
        }}
        styles={{
          listView: styles.list,
          textInput: styles.text,
          description: styles.text,
          predefinedPlacesDescription: styles.predefined,
          poweredContainer: styles.powered,
          powered: styles.powered,
          separator: styles.separator,
          row: styles.row,
          textInputContainer: styles.container
        }}
        currentLocation={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF00',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  row: {
    overflow: 'visible',
    height: 35,
    padding: 6
  },
  separator: {
    backgroundColor: COLORS.main
  },
  powered: {
    opacity: 0,
    height: 0
  },
  predefined: {
    color: '#A5A5A5',
  },
  text: {
    ...SheetFONT('Regular', 16, '#333333')
  },
  list: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    ...DefaultShadow
  }
})

const Container = styled.View<{
  containerWidth: number | string,
  isKeyboardShown: boolean
}>`
  height: ${({isKeyboardShown}) => isKeyboardShown ? `160` : `40`}px;
  z-index: 100;
  width: ${({containerWidth}) => containerWidth};
`