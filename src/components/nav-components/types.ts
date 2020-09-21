import { BottomTabBarOptions, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { NavigationState, PartialState, Route } from "@react-navigation/native";

export interface IBackButtonProps {
  onPress: () => void,
  color?: string
}

export interface BottomTabContentProps 
  extends BottomTabBarProps<BottomTabBarOptions> {

}

export interface TabEvents {
  onPress: (
    route: Route<string> & {
      state?: NavigationState | PartialState<NavigationState> | undefined;
    }, 
    index: number,
    isFocused: boolean
  ) => void
}

export interface IconsVariantProps {
  [index: number]: Element
}