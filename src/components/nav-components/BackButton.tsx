import React from 'react';
import styled from 'styled-components/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { IBackButtonProps } from './types'

const BackButton: React.FC<IBackButtonProps> = ({
  onPress, 
  color = 'white'
}) => {
  return (
    <TouchContainer onPress={onPress}>
      <Ionicons 
        name='ios-chevron-back' 
        size={30} 
        color={color} 
      />
    </TouchContainer> 
  )
}

const TouchContainer = styled.TouchableOpacity`
  padding: 2px 10px 2px 10px;
`;

export default BackButton;