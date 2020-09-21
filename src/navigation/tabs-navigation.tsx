import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { NavElement } from "../types/navigation"
import { NavTree } from "../config/navigation-tree"
import { MapStackNavigator } from './tabs-map-stack-navigation'
import { SearchStackNavigator } from './tabs-search-stack-navigation'
import { BottomTabContent } from '../components/nav-components'

const TabsNavigator = createBottomTabNavigator();

export const TabsStackNavigator: React.FC<NavElement> = ({
  navigation
}) => {
  return (
    <TabsNavigator.Navigator
      tabBar={props => <BottomTabContent {...props} />}
      initialRouteName={NavTree.TabsBranch.MapStackRudiment.path}
    >
      <TabsNavigator.Screen
        name={NavTree.TabsBranch.MapStackRudiment.path}
        options={{
          title: NavTree.TabsBranch.MapStackRudiment.title
        }}
        component={MapStackNavigator} 
      />
      <TabsNavigator.Screen
        name={NavTree.TabsBranch.SearchStackRudiment.path}
        options={{
          title: NavTree.TabsBranch.SearchStackRudiment.title
        }}
        component={SearchStackNavigator} 
      />
    </TabsNavigator.Navigator>
  )
}