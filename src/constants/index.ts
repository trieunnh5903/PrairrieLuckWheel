import {Dimensions} from 'react-native';

const {width: screen_width, height: screen_height} = Dimensions.get('window');
const {width: device_width, height: device_height} = Dimensions.get('screen');

export {screen_height, screen_width, device_height, device_width};
