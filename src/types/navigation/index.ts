import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NavigationProp } from '@react-navigation/native'

import { CustomWeatherItemType } from '../entities/weather'
import { PlaceType } from '../entities/place'

export type NavigationVariants = 'stack' | 'tabs' | 'drawer' | 'root'

/**
 * @type Fetus
 * @description Navigation endpoint
 * @example Screen always endpoint
 */
export interface NavigationFetus {
  title: string,
  path: string
}

/**
 * @type Rudiment
 * @description Navigation point that contains other navigation points and cannot be the endpoint
 * @example Tabs, Drawer and Stack always rudiment, because contain screens or other rudiments
 */
export interface NavigationRudiment 
  extends NavigationFetus {
  type?: NavigationVariants
  child?: NavigationFetus['path']
}

/**
 * @type Tree
 * @description Tree that describes the position and connections of all navigation points 
 */
export interface NavigationTree {
  Root: {
    TabsRudiment: NavigationRudiment
  },
  TabsBranch: {
    MapStackRudiment: NavigationRudiment
    SearchStackRudiment: NavigationRudiment
  },
  MapBranch: {
    MapScreen: NavigationFetus
  },
  SearchBranch: {
    SearchScreen: NavigationFetus
  }
}

export enum ENavTypes {
  STACK_ELEMENT = 'NAVIGATION_STACK_ELEMENT',
  TABS_ELEMENT = 'NAVIGATION_TABS_ELEMENT'
}

export interface Route<Params extends object = {}> {
  key: string,
  name: string,
  params: Params
}

export interface NavElement<
  Type extends ENavTypes = ENavTypes.STACK_ELEMENT, 
  Params extends object = {}
> {
  navigation: 
    Type extends ENavTypes.STACK_ELEMENT 
      ? StackNavigationProp<any> : 
    Type extends ENavTypes.TABS_ELEMENT 
      ? BottomTabNavigationProp<any> : 
    NavigationProp<any>,
  route: Route<Params>
}

export interface MapScreenProps
  extends NavElement<ENavTypes.TABS_ELEMENT> {
  
}

export interface SearchScreenProps
  extends NavElement<ENavTypes.TABS_ELEMENT, {
    place?: PlaceType
  }> {
  
}

export interface TempWeatherByDays {
  [dayIndex: number]: CustomWeatherItemType 
}