import {Dimensions} from 'react-native';
export const MAIL = 'nguyennhathaitrieu5903@gmail.com';
export const PASSWORD = '123456789';
const colors = {
  primary: '#7e9d38',
};
const {width: screen_width, height: screen_height} = Dimensions.get('window');
const {width: device_width, height: device_height} = Dimensions.get('screen');
export {screen_height, screen_width, device_height, colors, device_width};
export * from './globalStyle';
export * from './ScreenName';
export * from './storageKey';
