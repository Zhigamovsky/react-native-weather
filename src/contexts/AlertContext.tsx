import React, { createContext, useState } from 'react';
import ModalView from 'react-native-modal';
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native';

import { Button } from '../components/form-components'
import { 
  Alert, 
  AlertButtonVariants,
  AlertContextActions, 
  AlertContextProps
} from '../types/contexts/alert'
import { COLORS, FLEX, FONT } from '../utils/';

// @ts-expect-error
const AlertContext: AlertContextProps = createContext({
  alert: null,
  actions: {},
});

export default AlertContext;

export const AlertContextProvider: React.FC<any> = ({children}) => {
  const _defaultAlertState = {
    _id: 'default',
    visibility: false,

    title: 'Message',
    titleOptions: {
      align: 'center',
      inlineTextStyles: ' '
    },

    Header: <></>,
    Buttons: <></>,
    Content: <></>,
    Alert: <></>,

    descriptionOptions: {
      align: 'center',
      inlineTextStyles: ' '
    },

    buttons: ['OK'],

    onModalHide: (type = 'NONE') => {
      _cancelButtonHandler();
    },

    cancelButtonText: 'Cancel',
    cancelButtonHandler: () => {
      _hide();
    },
    okButtonText: 'OK',
    okButtonHandler: () => {
      _hide();
    },
    moreButtonText: 'More',
    moreButtonHandler: () => {
      _hide();
    }
  }
  
  const _defaultButtonProps = {
    width: 100,
    widthUnit: 'px' as 'px',
    height: 35,
    heightUnit: 'px' as 'px',
    containerStyle: buttonContainerStyle
  }

  const [alert, updateAlertState] = useState<Alert | null>(null);
  const [pressedButton, changePressedButton] = useState<AlertButtonVariants | 'NONE'>('NONE');
  
  const _hide = () => {
    updateAlertState({
      ...alert,
      visibility: false
    });
  }

  const _onModalHide = () => {
    alert?.onModalHide ? alert.onModalHide(pressedButton) : _defaultAlertState.onModalHide();
  }

  const _okButtonHandler = () => {
    changePressedButton('OK');
    alert?.okButtonHandler ? alert.okButtonHandler() : _defaultAlertState.okButtonHandler()
  }

  const _cancelButtonHandler = () => {
    changePressedButton('CANCEL')
    alert?.cancelButtonHandler ? alert.cancelButtonHandler() : _defaultAlertState.cancelButtonHandler()
  }

  const actions: AlertContextActions = {
    SHOW: async state => {
      let _state = state;
      _state.visibility = true;
      updateAlertState(_state);
      return alert;
    },
    HIDE: async state => {
      _cancelButtonHandler();
      return alert;
    }
  }

  const renderOkButton = () => {
    if(alert?.buttons?.length && alert?.buttons.includes('OK')){
      return (
        <Button 
          {
            ...{
              ..._defaultButtonProps,
              ...(alert.okButtonText || _defaultAlertState.okButtonText).length > 8 ? {
                width: 150,
              } : {}
            }
          }
          onPress={_okButtonHandler} 
          title={alert.okButtonText || _defaultAlertState.okButtonText}
        />
      )
    }
    else return null
  }

  const renderCancelButton = () => {
    if(alert?.buttons?.length && alert?.buttons.includes('CANCEL')) {
      return (
        <Button 
          {..._defaultButtonProps}
          template='fill-grey'
          onPress={_cancelButtonHandler}
          title={alert.cancelButtonText || _defaultAlertState.cancelButtonText}
        />
      )
    }
    else return null
  }

  const renderButtons = () => {
    if(alert?.Buttons) {
      return alert.Buttons
    }
    else {
      return (
        <ButtonsContainer>
          { renderOkButton() }
          { renderCancelButton() }
        </ButtonsContainer>
      )
    }
  }

  const renderHeader = () => {
    if(alert?.Header) {
      return alert.Header
    }
    else {
      return (
        <HeaderContainer>
          <HeaderTitle
            titleOptions={alert?.titleOptions}
            defaultOptions={_defaultAlertState.titleOptions as Alert['titleOptions']}
          >
            {alert?.title || _defaultAlertState.title}
          </HeaderTitle>
        </HeaderContainer>
      )
    }
  }

  const renderContent = () => {
    if(alert?.Content) {
      return alert.Content
    }
    else {
      return (
        <ContentContainer>
          {
            alert?.description ? (
              <DescriptionText 
                descriptionOptions={alert?.descriptionOptions}
                defaultOptions={_defaultAlertState.descriptionOptions as Alert['descriptionOptions']}
              >
                {alert?.description}
              </DescriptionText>
            ) : null
          }
        </ContentContainer>
      )
    }
  }

  return (
    <AlertContext.Provider value={{ alert, actions }}>
      {
        alert ?
          <ModalView
            isVisible={alert.visibility}
            onModalHide={_onModalHide}
            onBackButtonPress={_cancelButtonHandler}
            onBackdropPress={_cancelButtonHandler}
            useNativeDriver
            animationIn='zoomIn'
            animationOut='zoomOut'
            avoidKeyboard={true}
          >
            {
              alert.Alert || (
                <Container>
                  { renderHeader() }
                  { renderContent() }
                  { renderButtons() }
                </Container>
              )
            }
          </ModalView>
        : null
      }
      { children }
    </AlertContext.Provider>
  )
}

const { buttonContainerStyle } = StyleSheet.create({
  buttonContainerStyle: {
    padding: 5
  }
})

const Container = styled.View`
  background: ${COLORS.background};
  border-radius: 10px;
  padding: 20px 10px;
`;

const HeaderContainer = styled.View`
  min-height: 50px;
  ${FLEX()}
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const HeaderTitle = styled.Text<{
  titleOptions: Alert['titleOptions'],
  defaultOptions: Alert['titleOptions']
}>`
  ${FONT('Bold', 20)}
  ${({titleOptions, defaultOptions}) => `
    text-align: ${titleOptions?.align || defaultOptions?.align};
    ${titleOptions?.inlineTextStyles || defaultOptions?.inlineTextStyles}
  `}
`;

const ContentContainer = styled.View`
  ${FLEX()}
`;

const DescriptionText = styled.Text<{
  descriptionOptions: Alert['descriptionOptions'],
  defaultOptions: Alert['descriptionOptions']
}>`
  padding: 10px;
  ${FONT('Regular', 17)}
  ${({descriptionOptions, defaultOptions}) => `
    text-align: ${descriptionOptions?.align || defaultOptions?.align};
    ${descriptionOptions?.inlineTextStyles || defaultOptions?.inlineTextStyles}
  `}
`;

const ButtonsContainer = styled.View`
  height: 45px;
  ${FLEX('row', 'center', 'space-around', 'wrap')}
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;