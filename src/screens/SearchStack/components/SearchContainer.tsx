import React, { useState } from 'react'
import styled from 'styled-components/native'

import { SheetFLEX } from '../../../utils'
import { SearchContainerProps } from './types'
import { INPUT_WIDTH } from './config'
import { SearchButton } from './SearchButton'
import { GooglePlacesAutocomplete } from './GoogleCityAutocomplete'
import { StyleSheet } from 'react-native'

export const SearchContainer: React.FC<SearchContainerProps> = ({
  onSearch
}) => {
  const [searchValue, writeSearchValue] = useState<string>('')

  const _onSearch = () => {
    onSearch(searchValue)
    writeSearchValue('')
  }

  const _onSelect = (value: string) => {
    onSearch(value)
    writeSearchValue('')
  }

  return (
    <Container 
      bounces={false}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={containerStyle}
    >
      <GooglePlacesAutocomplete 
        value={searchValue}
        onValueChange={writeSearchValue}
        onComplexValueChange={googleAddress => _onSelect(googleAddress.formatted_address)}
        isFocused={true}
        overrideInputStyle={{
          width: INPUT_WIDTH
        }}
      />
      <SearchButton 
        onPress={_onSearch}
      />
    </Container>
  )
}

const { containerStyle } = StyleSheet.create({
  containerStyle: {
    ...SheetFLEX('row', 'flex-start', 'space-between'),
    paddingVertical: 5
  }
})

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
`