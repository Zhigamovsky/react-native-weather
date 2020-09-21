export type LoaderDissmisType = 'BACKBUTTON_CLICK' | 'BACKDROP_CLICK' | 'HIDE_EVENT';

export type Loader = {
  visibility?: boolean,
  onModalHide?: (callback?: () => void) => void,
}

export type LoaderContextActions = {
  SHOW: (loader?: Loader) => Promise<Loader | null>
  HIDE: (loader?: Loader) => Promise<Loader | null>
}

export type LoaderContextProps = React.Context<{
  loader: Loader | null
  actions: LoaderContextActions
}>