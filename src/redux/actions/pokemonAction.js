import { addDB, getAllDB, deleteDB } from '../../db';

export const unmountMyPokemon = () => async dispatch => {
  return dispatch({ type: 'SET_POKEMON_UNMOUNT' })
}

export const getPokemon = () => async (dispatch, getState) => {
  await dispatch(getAllDB((res) => {
    return dispatch({type: 'SET_POKEMON_SUCCESS', payload: {data: res}})
  }))
}

export const setPokemon = (data, name, successCB) => async (dispatch, getState) => {
  const newData = {
    id: data.id,
    name: name,
    body: data
  }
  return (
    dispatch({ type: 'SET_NEW_POKEMON_SUCCESS', payload: { data: data } }),
    dispatch(addDB(newData)),
    successCB()
  )
}

export const deletePokemon = (id, successCB) => async (dispatch, getState) => {
  dispatch(deleteDB(id, (res) => {
    return (
      dispatch({type: 'SET_NEW_POKEMON_SUCCESS', payload: {data: res}}),
      successCB()
    )
  }))
}





