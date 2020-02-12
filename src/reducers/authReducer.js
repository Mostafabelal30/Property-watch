import * as ActionTypes from '../action/types';

const INIT_STATE = {
  postList: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_POSTS_LIST:
      console.log('action.dataaction.data', action.data);
      return {...state, postList: action.data};
    case ActionTypes.DELETE_POST:
      console.log('action.dataaction.data', action.data);
      return {...state, postList: action.data};
    case ActionTypes.EDIT_POST:
      console.log('action.dataaction.data', action.data);
      return {...state, postList: action.data};
    default:
      return state;
  }
};
