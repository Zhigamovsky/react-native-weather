import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleProp, ViewStyle } from "react-native"

export interface HeaderPageProps {
  title: string,
  navigation: StackNavigationProp<any> | BottomTabNavigationProp<any>,
  enableBackButton?: boolean,
  ContentCenter?: React.ReactElement,
  containerStyle?: StyleProp<ViewStyle>
}

interface ContainerPageDefaultProps {
  scrollable?: boolean,
  background?: string,
  containerStyle?: ViewStyle,
  scrollviewStyle?: ViewStyle,
  containerScrollviewStyle?: ViewStyle,
  headerProps?: HeaderPageProps
}

export interface ContainerPageProps 
  extends ContainerPageDefaultProps {
    
}