interface Characters {
  name: string;
  sprite: string;
  type: string;
  life: number;
  attacks: number;
  error: boolean;
  loaded: boolean;
}

export interface InterfaceState {
  pikachu: Characters;
  raichu: Characters;
  error: boolean;
  loaded: boolean;
}

export const initialState: InterfaceState = {
  pikachu: {
    name: '',
    sprite: '',
    type: '',
    life: 0,
    attacks: 0,
    error: false,
    loaded: false
  },
  raichu: {
    name: '',
    sprite: '',
    type: '',
    life: 0,
    attacks: 0,
    error: false,
    loaded: false
  },
  error: false,
  loaded: false
}
