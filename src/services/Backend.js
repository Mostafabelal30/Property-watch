import {I18nManager, Platform, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as axios from 'axios';
import {BASE_URL} from '../config';
import {errorMessage, showCorrectPlateNumber} from '../utils/global';
import Posts from '../db/models/Posts';
import strings from '../strings';
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.common['IsIOS'] =
  Platform.OS == 'ios' ? 'true' : 'false';

function handleRequestError(data) {
  NetInfo.fetch().then(state => {
    console.log('isConnectedisConnected', state.isConnected);

    setTimeout(() => {
      if (!state.isConnected) {
        errorMessage(strings.noInternetConnection);
      } else {
        if (!data) {
          errorMessage(strings.anErrorOccured);
        }
      }
    });
  });
}

export const Backend = {
  token: '',
  lang: I18nManager.isRTL ? 'ar' : 'en',

  getPostsList() {
    return axios
      .get('posts', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then(function(response) {
        console.log('responseresponseresponseresponseresponse', response.data);
        return response;
      })
      .catch(function(err) {
        const response = err.response ? err.response.data : undefined;
        // console.log('errerrerrerrerrerr', err.message);
        // if (err.message === 'Network Error') {
        // }
        handleRequestError(response);
        return err;
      });
  },
  getCommentsList() {
    return axios
      .get('comments', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then(function(response) {
        console.log('responseresponseresponseresponseresponse', response.data);
        return response;
      })
      .catch(function(err) {
        const response = err.response ? err.response.data : undefined;
        // console.log('errerrerrerrerrerr', err);
        handleRequestError(response);
        return err;
      });
  },
};
