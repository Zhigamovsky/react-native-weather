import React, { useState } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'

import { BottomTabContentProps, TabEvents, IconsVariantProps } from "./types"
import { FLEX, SCREEN_DIMENSIONS, COLORS } from '../../utils'

const defaultIconsProps = {
  size: 30,
  color: COLORS.main
}

const IconsVariantTranslater: IconsVariantProps = {
  0: <MaterialCommunityIcons name='map-search' {...defaultIconsProps} />,
  1: <MaterialCommunityIcons name='cloud-search' {...defaultIconsProps} />
}

const BottomTabContent: React.FC<BottomTabContentProps> = ({
  state, descriptors, navigation, ...rest
}) => {
  const [activeTab, changeActiveTab] = useState<number>(0);
  
  const TabEvents: TabEvents = {
    onPress: (route, index, isFocused) => {
      changeActiveTab(index);
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      });
      if(!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    }
  }

  return (
    <Container>
      {
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label = options.tabBarLabel || options.title || route.name
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              key={route.key}
              style={touchTabStyle}
              onPress={() => TabEvents.onPress(route, index, state.index === index)}
            >
              <TabItemContent 
                isFocused={activeTab === index}
              >
                {IconsVariantTranslater[index]}
              </TabItemContent>
            </TouchableOpacity>
          )
        })
      }
    </Container>
  )
}

const { touchTabStyle } = StyleSheet.create({
  touchTabStyle: {
    overflow: 'visible',
    paddingRight: 7,
    width: SCREEN_DIMENSIONS.width / 5
  }
})

const Container = styled.SafeAreaView`
  ${FLEX('row', 'center','space-evenly')}
  elevation: 2;
  background: ${COLORS.secondary};
  margin: 0;
  margin-top: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: visible;
`

const TabItemContent = styled.View<{
  isFocused: boolean
}>`
  margin-bottom: 5px;
  overflow: visible;
  padding: 5px;
  width: ${SCREEN_DIMENSIONS.width / 5}px;
  ${FLEX('column', 'center', 'center')}
  opacity: ${({isFocused}) => isFocused ? 1 : 0.3};
`

export default BottomTabContent