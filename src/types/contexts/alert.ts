export type AlertButtonVariants = 'OK' | 'CANCEL' | 'MORE'

export type Alert = {
  _id?: string,
  visibility?: boolean,

  title?: string,
  titleOptions?: {
    align?: 'center' | 'left' | 'right',
    inlineTextStyles?: string
  },

  description?: string,
  descriptionOptions?: {
    align?: 'center' | 'left' | 'right',
    inlineTextStyles?: string
  },
  Header?: React.ReactChild,
  Content?: React.ReactChild,
  Buttons?: React.ReactChild,
  Alert?: React.ReactChild,

  buttons?: AlertButtonVariants[],

  onModalHide?: (type: AlertButtonVariants | 'NONE') => void,

  cancelButtonText?: string,
  cancelButtonHandler?: () => void,
  okButtonText?: string,
  okButtonHandler?: () => void,
  moreButtonText?: string,
  moreButtonHandler?: () => void
}

export type AlertContextActions = {
  SHOW: (state: Alert) => Promise<Alert | null>,
  HIDE: (state?: Alert) => Promise<Alert | null>
}

export type AlertContextProps = React.Context<{
  alert: Alert | null;
  actions: AlertContextActions;
}>