import {
  GET_POSTS_LIST,
  DELETE_POST,
  EDIT_POST,
  POST_PROP_CHANGED,
  ADD_POST,
  GET_COMMENTS_LIST,
} from './types';
// import validator from 'validator';
// import AsyncStorage from '@react-native-community/async-storage';
import {Backend} from '../services/Backend';
import Posts from '../db/models/Posts';
import { Comments } from '../db/schemas/Comment';
// import {savePlayerIdBackend} from './HomePageActions'
// import {errorMessage} from '../utils/global';
// import {NavigationActions, StackActions} from 'react-navigation';
// import {showMessage} from 'react-native-flash-message';
export const postPropChanged = (prop, value) => {
  return {
    type: POST_PROP_CHANGED,
    prop,
    value,
  };
};

export const getPostsList = () => {
  return async (dispatch, getState) => {
    await Backend.getPostsList().then(response => {
      if (response.message === 'Network Error') {
        dispatch(getPostsListRealm());
      } else {
        Posts.save(response.data);
        console.log('getWorkerStationgetWorkerStation', response.message);
        dispatch({
          type: GET_POSTS_LIST,
          data: response.data,
        });
      }
    });
  };
};

export const getPostsListRealm = () => {
  return async (dispatch, getState) => {
    let postList = Posts.allSync();
    dispatch({
      type: GET_POSTS_LIST,
      data: Array.from(postList),
    });
  };
};

export const getCommentsList = () => {
  return async (dispatch, getState) => {
    await Backend.getCommentsList().then(response => {
      if (response.message === 'Network Error') {
        dispatch(getCommentsListRealm());
      } else {
        Posts.saveComment(response.data);
        console.log('getWorkerStationgetWorkerStation', response);
        dispatch({
          type: GET_COMMENTS_LIST,
          data: response.data,
        });
      }
    });
  };
};

export const getCommentsListRealm = () => {
  return async (dispatch, getState) => {
    let commenttList = Posts.allSyncComment();
    dispatch({
      type: GET_COMMENTS_LIST,
      data: Array.from(commenttList),
    });
  };
};
export const addPost = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_POST,
    });
  };
};

export const deletePost = id => {
  return async (dispatch, getState) => {
    // alert(id);
    let state = getState();
    console.log(getState());
    const {postList} = state.post;
    const arr = postList.filter(function(item, i) {
      return item.id !== id;
    });
    // alert(JSON.stringify(arr));
    dispatch({
      type: DELETE_POST,
      data: arr,
    });
  };
};

export const editPost = id => {
  return async (dispatch, getState) => {
    // alert(id);
    let state = getState();
    console.log(getState());
    const {postList, title, body} = state.post;
    const newData = postList.map(item => {
      if (item.id === id) {
        item.body = body;
        item.title = title;
        return item;
      }
      return item;
    });
    // alert(JSON.stringify(arr));
    dispatch({
      type: EDIT_POST,
      data: newData,
    });
  };
};
