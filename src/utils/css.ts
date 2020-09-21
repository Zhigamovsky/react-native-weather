import { Dimensions, FlexStyle, TextStyle } from 'react-native';

export const SCREEN_DIMENSIONS = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height
}

export const FontFamily: string = 'Comfortaa'

export type FontVariants = 
  'Bold' |
  'Light' | 
  'Medium' |  
  'Regular' |
  'SemiBold' 
; 

export interface FontConstructor<T> {
  (
    type?: FontVariants,
    size?: TextStyle['fontSize'],
    color?: TextStyle['color']
  ): T
}

export const FONT: FontConstructor<string> = (type = 'Regular', size = 20, color = '#000000') => {
  return `
    font-family: '${FontFamily}-${type}';
    font-size: ${size}px;
    color: ${color.toString()};
  `;
}

export const SheetFONT: FontConstructor<object> = (type = 'Regular', fontSize = 20, color = '#000000') => {
  return {
    fontFamily: `${FontFamily}-${type}`,
    fontSize,
    color
  }
}

export interface FlexConstructor<T> {
  (
    direction?: FlexStyle['flexDirection'],
    align?: FlexStyle['alignItems'],
    justify?: FlexStyle['justifyContent'],
    wrap?: FlexStyle['flexWrap']
  ): T
}

export const FLEX: FlexConstructor<string> = (direction = 'row', align = 'center', justify = 'center', wrap = 'nowrap') => {
  return `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
    flex-wrap: ${wrap};
  `;
}

export const SheetFLEX: FlexConstructor<object> = (flexDirection = 'row', alignItems = 'center', justifyContent = 'center', flexWrap = 'nowrap') => {
  return {
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap
  }
}

export const DefaultShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
}

export const COLORS = {
  main: '#0071cc',
  secondary: '#85caff',
  background: '#d1eeff',
  statusbar: '#42aaff'
}