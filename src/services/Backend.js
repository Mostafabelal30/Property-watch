import {I18nManager, Platform, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as axios from 'axios';
import {BASE_URL} from '../config';
import {errorMessage, showCorrectPlateNumber} from '../utils/global';
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.common['IsIOS'] =
  Platform.OS == 'ios' ? 'true' : 'false';

function handleRequestError(data) {
  NetInfo.isConnected.fetch().then(isConnected => {
    setTimeout(() => {
      if (!isConnected) {
        // errorMessage(strings.noInternetConnection);
      } else {
        if (!data) {
          // errorMessage(strings.anErrorOccured);
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
        console.log('errerrerrerrerrerr', err);
        // handleRequestError(response);
        return response;
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
        console.log('errerrerrerrerrerr', err);
        // handleRequestError(response);
        return response;
      });
  },
};
