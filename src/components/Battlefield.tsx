import React, { useEffect } from 'react'

import { useStateGlobal } from '../storeProvider'

import Character from './Character'

import { Object } from '../utils/types'
import getRandomInt from '../utils/getRandomInt'

import to from 'await-to-js'

import './Battlefield.css'

const Battlefield: React.FC = () => {
  const { state: { pikachu, raichu, loaded }, dispatch } = useStateGlobal()

  const pokemonsLoaded = (pikachu.loaded && raichu.loaded) && (pikachu.life >= 1 && raichu.life >= 1)

  const attackOnTheOpponent: (name: string, life: number, attacks: number) => void = (name, life, attacks) => {
    const damage: number = getRandomInt(5, 10)
    const remainingLife: number = life - damage
    const toAttacked: number = attacks + 1

    dispatch({
      type: `ATTACK_TO_${name.toUpperCase()}`,
      payload: {
        life: remainingLife,
        attacks: toAttacked
      }
    })
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getData: () => void | null = async () => {
      let err: Error = null,
          pikachuRes: Response = undefined,
          raichuRes: Response = undefined,
          pikachuData: Object,
          raichuData: Object

      const pokemons: [string, string] = ['pikachu', 'raichu'];

      [ err, [ pikachuRes, raichuRes ] ] = await to(Promise.all(pokemons.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`, { signal }))));

      if (err) {
        dispatch({
          type: 'STATUS',
          payload: {
            error: true,
            loaded: false
          }
        })

        return null
      }

      if (pikachuRes.status === 200) {
        [ err, pikachuData ] = await to(pikachuRes.json())

        if (err) {
          dispatch({ type: 'PIKACHU_ERROR', payload: { error: true } })
        } else {
          dispatch({
            type: 'PIKACHU_DATA',
            payload: {
              name: pikachuData.name,
              sprite: pikachuData.sprites.front_default,
              type: pikachuData.types[0].type.name,
              error: false
            }
          })
        }
      }

      if (raichuRes.status === 200) {
        [ err, raichuData ] = await to(raichuRes.json())

        if (err) {
          dispatch({ type: 'RAICHU_ERROR', payload: { error: true } })
        } else {
          dispatch({
            type: 'RAICHU_DATA',
            payload: {
              name: raichuData.name,
              sprite: raichuData.sprites.front_default,
              type: raichuData.types[0].type.name
            }
          })
        }
      }

      dispatch({
        type: 'STATUS',
        payload: {
          error: false,
          loaded: true
        }
      })
    }

    getData()

    return () => abortController.abort()
    // eslint-disable-next-line
  }, [])

  if (!loaded) return <p>Cargando...</p>

  return (
    <div>
      <p className='title'>
        {
          pokemonsLoaded ? (
            '¡Pokemones a pelear!'
          ) : (
            `La batalla inicia cuando los 2 oponentes esten listos ${(pikachu.attacks || raichu.attacks) && 'nuevamente'}`
          )
        }
      </p>
      <div className='characters'>
        <Character
          name={pikachu.name}
          sprite={pikachu.sprite}
          type={pikachu.type}
          life={pikachu.life}
          opponentLife={raichu.life}
          attacks={pikachu.attacks}
          loaded={pikachu.loaded}
          onClick={() => attackOnTheOpponent('raichu', raichu.life, pikachu.attacks)}
          disabled={!pokemonsLoaded}
        />
        <Character
          name={raichu.name}
          sprite={raichu.sprite}
          type={raichu.type}
          life={raichu.life}
          opponentLife={pikachu.life}
          attacks={raichu.attacks}
          loaded={raichu.loaded}
          onClick={() => attackOnTheOpponent('pikachu', pikachu.life, raichu.attacks)}
          disabled={!pokemonsLoaded}
        />
      </div>
    </div>
  )
}

export default Battlefield
