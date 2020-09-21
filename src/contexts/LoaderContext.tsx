import React, { createContext, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import ModalView from 'react-native-modal'
import styled from 'styled-components/native'

import { COLORS, FLEX } from '../utils'
import { 
  Loader, 
  LoaderContextActions, 
  LoaderContextProps, 
  LoaderDissmisType
} from '../types/contexts/loader'

// @ts-expect-error
const LoaderContext: LoaderContextProps = createContext({
  loader: null,
  actions: {}
})

export default LoaderContext;

export const LoaderContextProvider: React.FC<any> = ({children}) => {
  const _defaultLoaderState = {
    visibility: false,
    onModalHide: () => {
      _cancelButtonHandler();
    },
    cancelButtonHandler: () => {
      _hide();
    },
  }

  const [loader, updateLoaderState] = useState<Loader | null>(null);

  const debugAsyncQuery = async () => {
    return loader;
  }

  const _show = () => {
    // @ts-ignore
    updateLoaderState({
      ...loader,
      visibility: true
    });
  }

  const _hide = () => {
    // @ts-ignore
    updateLoaderState({
      ...loader,
      visibility: false
    });
  }

  const _onModalHide = () => {
    loader?.onModalHide ? loader.onModalHide() : _defaultLoaderState.onModalHide();
  }

  const _cancelButtonHandler = () => {
    _defaultLoaderState.cancelButtonHandler();
  }

  const _tryToDismissLoader = (type: LoaderDissmisType) => {
     
  }
 
  const actions: LoaderContextActions = {
    SHOW: async (state = {
      visibility: true,
      onModalHide: _defaultLoaderState.onModalHide
    }) => {
      await debugAsyncQuery();
      let _state = state;
      _state.visibility = true;
      updateLoaderState(_state);
      return loader;
    },
    HIDE: async (state = {
      visibility: false,
      onModalHide: _defaultLoaderState.onModalHide
    }) => {
      return new Promise(resolve => {
        let _state = state;
        _state.visibility = false;
        _state.onModalHide = () => {
          resolve(loader);
          _cancelButtonHandler();
        }
        updateLoaderState(_state);
      });
    }
  }

  return (
    <LoaderContext.Provider value={{ loader, actions }}>
      {
        loader ?
          <ModalView
            isVisible={loader.visibility}
            onModalHide={_onModalHide}
            onBackButtonPress={() => _tryToDismissLoader('BACKBUTTON_CLICK')}
            onBackdropPress={() => _tryToDismissLoader('BACKDROP_CLICK')}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            backdropColor='#000000'
            style={modalStyle}
            useNativeDriver
          >
            <IndicatorContainer>
              <ActivityIndicator 
                size='large'
                color={COLORS.main}
              />
            </IndicatorContainer>
          </ModalView>
        : null
      }
      { children }
    </LoaderContext.Provider>
  )
}

const { modalStyle } = StyleSheet.create({
  modalStyle: {
    width: '20%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 0,
    marginVertical: 0,
    marginHorizontal: '40%',
  }
})

const IndicatorContainer = styled.View`
  width: 100%;
  height: 100px;
  background: ${COLORS.secondary};
  padding-top: 20px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  ${FLEX('row', 'flex-start')}
`;