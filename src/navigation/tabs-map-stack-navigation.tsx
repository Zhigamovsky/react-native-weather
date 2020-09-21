import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import { NavElement } from "../types/navigation"
import { NavTree } from "../config/navigation-tree"
import * as Screens from './../screens/MapStack'

const StackNavigator = createStackNavigator();

export const MapStackNavigator: React.FC<NavElement> = ({
  navigation
}) => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        /* hide react-navigation header for show custom header */
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
      initialRouteName={NavTree.MapBranch.MapScreen.path}
    >
      <StackNavigator.Screen
        name={NavTree.MapBranch.MapScreen.path}
        component={Screens.Map} 
      />
    </StackNavigator.Navigator>
  )
}