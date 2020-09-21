import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { LatLng } from 'react-native-maps'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { SearchScreenProps } from '../../types/navigation'
import Container from '../../components/screen-components/Container'
import { NavTree } from '../../config/navigation-tree'
import { SearchButton, SearchContainer, SearchEmptyMessage, SearchHeaderMessage } from './components'
import { WeatherDayItem } from './components/WeatherDayItem'
import { Divider } from '../../components/form-components'
import { HttpContext } from '../../contexts'
import { CustomWeatherItemType } from '../../types/entities/weather'
import { groupWeatherByDay } from '../../utils/calc'
import { useIsKeyboardShown } from '../../hooks'
import { FadeInView } from '../../components/animation-components'

const Screen: React.FC<SearchScreenProps> = ({
  navigation, route
}) => {
  const { params } = route

  const isKeyboardShown = useIsKeyboardShown()
  const { actions: httpActions } = useContext(HttpContext)
  const [weatherList, setWeatherList] = useState<CustomWeatherItemType[]>([])
  const [searchTitle, setSearchTitle] = useState<string>('')

  const SearchEvents = {
    searchByCity: async (value: string) => {
      if(!(value?.trim())) return
      try {
        let { data: { list: weatherList } } = await httpActions.GET_WEATHER_BY_CITY({
          data: {
            city: value.trim(),
            days: 5
          }
        })
        setSearchTitle(value)
        setWeatherList(groupWeatherByDay(weatherList))
      }
      catch(e) {
        setWeatherList([])
      }
    },
    searchByCoords: async (coords: LatLng) => {
      try {
        let { data: { list: weatherList } } = await httpActions.GET_WEATHER_BY_COORDS({
          data: {
            coords,
            days: 5
          }
        })
        setWeatherList(groupWeatherByDay(weatherList))
      }
      catch (e) {
        setWeatherList([])
      }
    },
    clearList: () => {
      setWeatherList([])
      setSearchTitle('')
    }
  }

  useEffect(() => {
    if(params?.place) {
      SearchEvents.searchByCoords(params.place.coordinates)
      setSearchTitle(params.place.displayTitle)
      navigation.setParams({
        place: null
      })
    }
  }, [params?.place])

  const renderFooter = () => {
    if(weatherList.length){
      return (
        <FadeInView>
          <SearchButton 
            overrideContainerStyle={clearButtonStyle}
            onPress={SearchEvents.clearList}
            renderIcon={(color, size) => (
              <MaterialCommunityIcons 
                name='progress-close'
                { ...{ color, size: size * 1.2}}
              />
            )}
          />
        </FadeInView>
      )
    }
    else return null
  }

  return (
    <Container 
      headerProps={{
        title: NavTree.SearchBranch.SearchScreen.title,
        navigation,
        ContentCenter: <SearchContainer onSearch={SearchEvents.searchByCity} />,
        ...isKeyboardShown ? { containerStyle: expandedHeaderStyle } : {}
      }}
    >
      <FlatList 
        style={listStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={listContainerStyle}
        data={weatherList}
        ListHeaderComponent={<SearchHeaderMessage title={searchTitle} />}
        renderItem={({ item, index }) => (
          <FadeInView>
            <WeatherDayItem 
              weatherData={item} 
              delayMounting={index}
            />
          </FadeInView>
        )}
        ItemSeparatorComponent={() => <Divider height={30} />}
        ListEmptyComponent={<SearchEmptyMessage />}
        ListFooterComponent={renderFooter()}
        keyExtractor={(_, index) => index.toString()}
      />
    </Container>
  )
}

const { listContainerStyle, listStyle, expandedHeaderStyle, clearButtonStyle } = StyleSheet.create({
  listStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: '10%'
  },
  listContainerStyle: {
    paddingVertical: 30
  },
  expandedHeaderStyle: {
    maxHeight: 200,
    height: 200
  },
  clearButtonStyle: {
    marginTop: 20
  }
})

export default Screen