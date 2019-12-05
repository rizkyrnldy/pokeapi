import axios from 'axios';
import Config from '../../config';

export const unmountDetailData = () => async dispatch => {
  return dispatch({ type: 'UNMOUNT_DETAIL_DATA' })
}

export const getDetailData = (index) => async dispatch => {
  new Promise((resolve, reject) => {
    axios.get(`${Config.URL}/${index}`).then((response) => {
      return (
        dispatch({ type: 'SET_DETAIL_DATA_SUCCESS', payload: { data: response.data } }),
        resolve()
      )
    }).catch((err) => {
      return (
        dispatch({ type: 'SET_DETAIL_DATA_FAILED', payload: { data: [] } }),
        reject(err)
      ) 
    })
  })
}
