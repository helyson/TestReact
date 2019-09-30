import React from 'react'

import Button from './Button'

import singularOrPlural from '../utils/singularOrPlural'
import toCapitalize from '../utils/toCapitalize'

import './Character.css'

interface CharacterProps {
  name: string;
  sprite: string;
  type: string;
  life: number;
  opponentLife: number;
  attacks: number;
  loaded: boolean;
  onClick: () => void;
  disabled: boolean;
 }

const Character: React.FC<CharacterProps> = ({ name, sprite, type, life, opponentLife, attacks, loaded, onClick, disabled }) => {
  type SingularOrPluralOptsType = {
    singular: string;
    plural: string;
  }

  const singularOrPluralOpts: SingularOrPluralOptsType = {
    singular: 'vez',
    plural: 'veces'
  }

  const battleOver: boolean = life < 1 || opponentLife < 1
  const typeButton: string = name === 'pikachu' ? 'primary' : 'default'

  return (
    <div>
      {
        life < 1 &&
        <p className='lost-battle'>{toCapitalize(name)} ha perdido la batalla.</p>
      }
      {
        opponentLife < 1 &&
        <p className='won-battle'>{toCapitalize(name)} es el ganador.</p>
      }
      <p>{toCapitalize(name)} {battleOver ? 'atacó' : 'ha atacado'} {singularOrPlural(attacks, singularOrPluralOpts)}</p>
      {
        loaded ? (
          <div className='character'>
            <img src={sprite} alt={name} />
            <ul className='character-info'>
              <li>Nombre: {name.toUpperCase()}</li>
              <li>Tipo: {toCapitalize(type)}</li>
              <li>Vida: {life < 1 ? '0' : life}</li>
            </ul>
            {
              !disabled &&
              <Button type={typeButton} onClick={onClick}>Atacar</Button>
            }
          </div>
        ) : (
          <p>Cargando...</p>
        )
      }
    </div>
  )
}

export default Character
