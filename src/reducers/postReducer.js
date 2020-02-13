import * as ActionTypes from '../action/types';

const INIT_STATE = {
  postList: [],
  commentList: [],
  title: '',
  body: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.POST_PROP_CHANGED:
      return {...state, [action.prop]: action.value};
    case ActionTypes.GET_POSTS_LIST:
      console.log('action.dataaction.data', action.data);
      return {...state, postList: action.data.reverse()};
    case ActionTypes.GET_COMMENTS_LIST:
      console.log('commentListcommentListcommentList', action.data);
      return {...state, commentList: action.data};
    case ActionTypes.ADD_POST:
      console.log('action.dataaction.data', action.data);
      return {
        ...state,
        postList: [
          {
            userId: 1,
            id: state.postList.length + 1,
            title: state.title,
            body: state.body,
          },
          ...state.postList,
        ],
        body: '',
        title: '',
      };
    case ActionTypes.DELETE_POST:
      console.log('action.dataaction.data', action.data);
      return {...state, postList: action.data};
    case ActionTypes.EDIT_POST:
      console.log('action.dataaction.data', action.data);
      return {...state, postList: action.data, body: '', title: ''};
    default:
      return state;
  }
};
