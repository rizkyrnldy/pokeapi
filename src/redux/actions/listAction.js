import axios from 'axios';
import Config from '../../config';

export const unmoutListData = () => async dispatch => {
  return dispatch({type: 'UNMOUNT_LIST_DATA'})
}

export const getListData = (page) => async dispatch => {
  const _page = page * 10;
  axios.get(`${Config.URL}?offset=0&limit=${_page}`).then(function (response) {
    return dispatch({ type: 'SET_LIST_DATA_SUCCESS', payload: { data: response.data.results } })
  })
  .catch(function () {
    return dispatch({ type: 'SET_LIST_DATA_FAILED', payload: { data: [] } })
  })
}
