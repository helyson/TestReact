import { InterfaceState } from './initialState'
import { InterfaceActions } from './reducer'

import { Object } from './utils/types'

export interface InterfaceActions {
  type: string;
  payload: Object;
}

export const reducer = (state: InterfaceState, action: InterfaceActions) => {
  switch (action.type) {
    case 'STATUS':
      return {
        ...state,
        error: action.payload.error,
        loaded: action.payload.loaded
      }
    case 'PIKACHU_DATA':
      return {
        ...state,
        pikachu: {
          ...state.pikachu,
          name: action.payload.name,
          sprite: action.payload.sprite,
          type: action.payload.type,
          life: 100,
          loaded: true
        }
      }
    case 'PIKACHU_ERROR':
      return {
        ...state,
        pikachu: {
          ...state.pikachu,
          error: action.payload.error
        }
      }
    case 'RAICHU_DATA':
      return {
        ...state,
        raichu: {
          ...state.raichu,
          name: action.payload.name,
          sprite: action.payload.sprite,
          type: action.payload.type,
          life: 100,
          loaded: true
        }
      }
    case 'RAICHU_ERROR':
        return {
          ...state,
          raichu: {
            ...state.raichu,
            error: action.payload.error
          }
        }
    case 'ATTACK_TO_RAICHU':
      return {
        ...state,
        pikachu: {
          ...state.pikachu,
          attacks: action.payload.attacks
        },
        raichu: {
          ...state.raichu,
          life: action.payload.life
        }
      }
    case 'ATTACK_TO_PIKACHU':
        return {
          ...state,
          raichu: {
            ...state.raichu,
            attacks: action.payload.attacks
          },
          pikachu: {
            ...state.pikachu,
            life: action.payload.life
          }
        }
    default:
      return state
  }
}
