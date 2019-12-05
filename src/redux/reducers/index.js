import { combineReducers } from 'redux';
import list from './listReducer';
import detail from './detailReducer';
import myPokemon from './pokemonReducer';

export default combineReducers({
  list,
  detail,
  myPokemon
});

