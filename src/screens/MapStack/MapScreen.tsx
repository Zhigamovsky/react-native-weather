import React, { createRef, useState } from 'react'
import styled from 'styled-components/native'
import MapView, { LatLng, MapEvent } from 'react-native-maps'
import Geocoder from 'react-native-geocoding'

import { MapScreenProps, SearchScreenProps } from '../../types/navigation'
import Container from '../../components/screen-components/Container'
import { NavTree } from '../../config/navigation-tree'
import { StyleSheet, Vibration } from 'react-native'
import { MAP_INITIAL_REGION } from './config'
import { PlaceType } from '../../types/entities/place'
import { WeatherCityData, WeatherMarker } from './components'

const Screen: React.FC<MapScreenProps> = ({
  navigation
}) => {
  const MapRef = createRef<MapView>()
  const [activePlace, setActivePlace] = useState<PlaceType | null>(null)

  const MapEvents = {
    onLongPress: async (event: MapEvent) => {
      const { latitude, longitude } = event.nativeEvent.coordinate 
      try {
        // @ts-expect-error // Geocoder does not exist normal index.d.ts
        let { results: [ matched ] } = await Geocoder.from(latitude, longitude)
        let displayTitle: string = 'Not recognized region'
        matched.address_components.map((address: any) => {
          if(address.types.includes('administrative_area_level_2') || address.types.includes('administrative_area_level_1')) {
            displayTitle = address.long_name
          }
          if(address.types.includes('country')) {
            displayTitle += `, ${address.long_name}`
          }
        }) 
        Vibration.vibrate(10)
        MapEvents.animatedCameraTo({ 
          latitude, longitude 
        })
        setActivePlace({
          coordinates: { latitude, longitude },
          displayTitle
        })
      }
      catch(e) {
        console.warn(e)
      }
    },
    toWeatherScreen: (place: PlaceType) => {
      navigation.navigate(NavTree.TabsBranch.SearchStackRudiment.path, {
        screen: NavTree.SearchBranch.SearchScreen.path, 
        params: ({
          place
        } as SearchScreenProps['route']['params'])
      }) 
    },
    clearPlace: () => {
      setActivePlace(null)
    },
    animatedCameraTo: (center: LatLng) => {
      MapRef?.current?.animateCamera({
        center,
        zoom: 12
      }, { duration: 500 })
    }
  }

  const renderWeatherMarker = () => {
    if(activePlace?.coordinates) {
      return <WeatherMarker coordinates={activePlace.coordinates}/>
    }
    else return null
  }

  const renderWeatherData = () => {
    if(activePlace) {
      return (
        <WeatherCityData 
          place={activePlace} 
          onClosePlace={MapEvents.clearPlace}
          onPressPlace={MapEvents.toWeatherScreen} 
        />
      )
    }
    else return null
  }

  return (
    <Container 
      headerProps={{
        title: NavTree.MapBranch.MapScreen.title,
        navigation
      }}
      containerStyle={{ overflow: 'hidden' }}
    >
      <MapView 
        ref={MapRef} 
        onLongPress={MapEvents.onLongPress}
        style={mapStyle}
        initialRegion={MAP_INITIAL_REGION}
        loadingEnabled
      >
        { renderWeatherMarker() }
      </MapView>
      <RelativeWrapper>
        { renderWeatherData() }
      </RelativeWrapper>
    </Container>
  )
}

const { mapStyle } = StyleSheet.create({
  mapStyle: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    borderRadius: 20
  }
})

const RelativeWrapper = styled.View`
  position: relative;
  width: 100%;
`

export default Screen