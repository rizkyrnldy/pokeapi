const SET_POKEMON               = 'SET_POKEMON';
const SET_POKEMON_SUCCESS       = 'SET_POKEMON_SUCCESS';
const SET_NEW_POKEMON_SUCCESS   = 'SET_NEW_POKEMON_SUCCESS';
const SET_POKEMON_FAILED        = 'SET_POKEMON_FAILED';
const SET_POKEMON_UNMOUNT       = 'SET_POKEMON_UNMOUNT';

const initialState = {
  loading: true,
  data: [],
};

export default function pokemonReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_POKEMON:
      return {
        ...state,
        loading: true,
      };
    case SET_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case SET_POKEMON_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
      };
    case SET_NEW_POKEMON_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case SET_POKEMON_UNMOUNT:
      return {
        ...state,
        loading: true,
        data: [],
      };
    default:
      return state;
  }
}
