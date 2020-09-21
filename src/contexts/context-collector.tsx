import React from 'react';
import * as Context from './';

const ContextCollector: React.FC = ({ children }) => {
  return (
    <Context.AlertContextProvider>
      <Context.LoaderContextProvider>
        <Context.HttpContextProvider>
          { children }
        </Context.HttpContextProvider>
      </Context.LoaderContextProvider>
    </Context.AlertContextProvider>
  )
}

export default ContextCollector;