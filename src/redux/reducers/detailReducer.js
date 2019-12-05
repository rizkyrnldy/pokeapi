const SET_DETAIL_DATA = 'SET_DETAIL_DATA';
const SET_DETAIL_DATA_SUCCESS = 'SET_DETAIL_DATA_SUCCESS';
const SET_DETAIL_DATA_FAIL = 'SET_DETAIL_DATA_FAIL';
const UNMOUNT_DETAIL_DATA = 'UNMOUNT_DETAIL_DATA';

const initialState = {
  loading: true,
  data: null,
};

export default function detailReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DETAIL_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case SET_DETAIL_DATA_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
      };
      
    case UNMOUNT_DETAIL_DATA:
      return {
        ...state,
        loading: true,
        data: null,
      };

    default:
      return state;
  }
}
