import React, { createContext, useContext } from 'react';
import Axios from 'axios'

import { Log } from '../utils'
import LoaderContext from './LoaderContext'
import AlertContext from './AlertContext'
import { 
  HttpContextProps,
  HttpMakeFetchMethod,
  ErrorConstructor,
  HttpContextActions
} from '../types/contexts/http'
import { QUERIES_URL } from '../config'
import { ERROR_TRANSLATER } from './config'

// @ts-expect-error
const HttpContext: HttpContextProps = createContext({
  actions: {}
})

export default HttpContext;

export const HttpContextProvider: React.FC<any> = ({children}) => {
  const { actions: loaderActions } = useContext(LoaderContext);
  const { actions: alertActions } = useContext(AlertContext);

  const MAKE_FETCH: HttpMakeFetchMethod = (
    axiosConfig, 
    config, 
    nativeConfig = {
      identifier: 'UNDEFINED'
    }, 
    callback = () => {}
  ) => {
    let enabledLoader: boolean = false;
    let enabledErrorHandler: boolean = false;
    if(!config || !config.skipLoader) enabledLoader = true;
    if(!config || !config.skipErrorHandler) enabledErrorHandler = true;
    enabledLoader && loaderActions.SHOW();
    return new Promise(async (resolve, reject) => {
      try {
        let response = await Axios.request(axiosConfig);
        let message = response.status + ' ⟴ ' + axiosConfig.method + ' ⟴ Axios ⟴ ' + nativeConfig.identifier + ' ⟴ URL:' + axiosConfig.url;
        Log.zelda(message, response);
        resolve(response);
        enabledLoader && await loaderActions.HIDE();
      }
      catch(e) {
        let error: ErrorConstructor = (ERROR_TRANSLATER(e) as ErrorConstructor);
        let message = error.code + ' ⟴ ' + axiosConfig.method + ' ⟴ Axios ⟴ ' + nativeConfig.identifier + ' ⟴ URL:' + axiosConfig.url;
        Log.ruddy(message, error);
        reject(error);
        enabledLoader && await loaderActions.HIDE();
        enabledErrorHandler && alertActions.SHOW({
          title: 'Error',
          buttons: ['OK'],
          description: error?.message || e
        });
      }
    })
  }
  
  const actions: HttpContextActions = {
    GET_WEATHER_BY_CITY: async request => {
      return new Promise (async (resolve, reject) => {
        try {
          let response = await MAKE_FETCH({
            /**
             * Need 56 (for weather for 7 days), but got maximum is 40 (for 5 days). Fucking free plan
             */
            url: QUERIES_URL.weather_by_city_name(encodeURI(request.data.city), request.data.days * 8), 
            method: 'GET'
          }, request.config, { 
            identifier: 'GET_WEATHER_BY_CITY' 
          })
          resolve(response)
        }
        catch(e) {
          reject(e)
        }
      })
    },
    GET_WEATHER_BY_COORDS: async request => {
      return new Promise (async(resolve, reject) => {
        try {
          let response = await MAKE_FETCH({
            url: QUERIES_URL.weather_by_coords(request.data.coords, request.data.days * 8), 
            method: 'GET'
          }, request.config, { 
            identifier: 'GET_WEATHER_BY_COORDS' 
          })
          resolve(response)
        }
        catch(e) {
          reject(e)
        }
      })
    }
  }

  return (
    <HttpContext.Provider value={{actions}}>
      { children }
    </HttpContext.Provider>
  )
}