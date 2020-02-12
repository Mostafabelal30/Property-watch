import {showMessage} from 'react-native-flash-message';

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

export function showCorrectPlateNumber(plateNumber) {
  return (
    plateNumber
      .substring(0, 3)
      .split('')
      .join('') +
    // ' ' +
    plateNumber
      .substring(3)
      .split('')
      .reverse()
      .join('')
  );
}
