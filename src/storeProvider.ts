import React, { Dispatch, useContext } from 'react'

import { InterfaceState } from './initialState'
import { InterfaceActions } from './reducer'

interface ContextProps {
  state: InterfaceState;
  dispatch: Dispatch<InterfaceActions>;
}

export const Context = React.createContext({} as ContextProps)

export const useStateGlobal = () => useContext(Context)
