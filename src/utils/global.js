import {showMessage} from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';

export function errorMessage(message) {
  showMessage({
    message: message,
    type: 'danger',
    icon: {
      icon: 'danger',
      position: 'left',
    },
  });
}

export function successMessage(message) {
  showMessage({
    message: message,
    type: 'success',
    icon: {
      icon: 'success',
      position: 'left',
    },
  });
}

export const isConnected = async () => {
  const asd = await NetInfo.fetch().then(state => state);
  console.log('asdasd', asd);
  return asd.isConnected;
};
