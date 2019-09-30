import React, { useReducer } from 'react'

import { reducer } from './reducer'
import { initialState } from './initialState'
import { Context } from './storeProvider'

import Battlefield from './components/Battlefield'

const App: React.FC = () => {
	const [ state, dispatch ] = useReducer(reducer, initialState)

	return (
		<Context.Provider value={{ state, dispatch }}>
			{
				state.error ? (
					<p>Ocurrio un problema al intentar cargar la aplicacion</p>
				) : (
					<Battlefield />
				)
			}
		</Context.Provider>
	)
}

export default App
