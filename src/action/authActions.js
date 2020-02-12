import {GET_POSTS_LIST, DELETE_POST,EDIT_POST} from './types';
// import validator from 'validator';
// import AsyncStorage from '@react-native-community/async-storage';
import {Backend} from '../services/Backend';
// import {savePlayerIdBackend} from './HomePageActions'
// import {errorMessage} from '../utils/global';
// import {NavigationActions, StackActions} from 'react-navigation';
// import {showMessage} from 'react-native-flash-message';

export const getPostsList = () => {
  return async (dispatch, getState) => {
    await Backend.getPostsList().then(response => {
      console.log('getWorkerStationgetWorkerStation', response);
      dispatch({
        type: GET_POSTS_LIST,
        data: response.data,
      });
    });
  };
};

export const deletePost = id => {
  return async (dispatch, getState) => {
    // alert(id);
    let state = getState();
    console.log(getState());
    const {postList} = state.auth;
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
    const {postList} = state.auth;
    const newData = postList.map(item => {
      if (item.id === id) {
        item.body = 'this.state.inputText';
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
