import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { TabsStackNavigator } from './tabs-navigation';
import { NavElement } from '../types/navigation';

const Application: React.FC<NavElement> = ({
  navigation
}) => {
  return (
    <NavigationContainer>
      {/* @ts-expect-error */}
      <TabsStackNavigator 
        navigation={navigation} 
      />
    </NavigationContainer>
  ) 
}

export default Application;