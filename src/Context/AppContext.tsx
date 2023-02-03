import React, { createContext, useState } from 'react'
import AddToQueueContext from './AddToQueueContext';

const AppContext = ({children}:{children:JSX.Element}) => {

  return (
      <AddToQueueContext>
          {children}
      </AddToQueueContext>
  )
}

export default AppContext