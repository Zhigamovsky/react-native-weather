import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import { NavElement } from "../types/navigation"
import { NavTree } from "../config/navigation-tree"
import * as Screens from './../screens/SearchStack'

const StackNavigator = createStackNavigator();

export const SearchStackNavigator: React.FC<NavElement> = ({
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
      initialRouteName={NavTree.SearchBranch.SearchScreen.path}
    >
      <StackNavigator.Screen
        name={NavTree.SearchBranch.SearchScreen.path}
        component={Screens.Search} 
      />
    </StackNavigator.Navigator>
  )
}