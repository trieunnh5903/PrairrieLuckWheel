import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../redux/store';
import {ScreenName} from '../constants';
import * as ScopedStorage from 'react-native-scoped-storage';

const {height, width} = Dimensions.get('window');
const WelcomeScreen = ({navigation}) => {
  const rotateImage = useAppSelector(state => state.imageRotation);
  const storeImageBackround = useAppSelector(state => state.imageBackground);
  const location = useAppSelector(state => state.location);
  const gifts = useAppSelector(state => state.gifts);
  const [pressCount, setPressCount] = useState(0);
  const standByBackground = useAppSelector(state => state.standByBackground);

  const onSettingPress = () => {
    setPressCount(pressCount + 1);
    if (pressCount === 4) {
      navigation.navigate(ScreenName.HistoryScreen);
    }

    setTimeout(() => {
      setPressCount(0);
    }, 3000);
  };

  const onPlayPress = async () => {
    const result = await checkData();
    if (result) {
      navigation.navigate(ScreenName.CustomerInfoScreen);
    }
  };

  const checkData = async () => {
    try {
      let messaage = '';
      const persistedUris = await ScopedStorage.getPersistedUriPermissions();
      if (persistedUris.length === 0) {
        messaage = 'Thư mục lưu trữ trống';
      } else if (!rotateImage) {
        messaage = 'Ảnh vòng quay đang trống';
      } else if (!storeImageBackround) {
        messaage = 'Ảnh nền vòng quay đang trống';
      } else if (!location) {
        messaage = 'Điểm bán trống';
      } else {
        for (let index = 0; index < gifts.length; index++) {
          const element = gifts[index];
          if (!element) {
            messaage = 'Ảnh phần quà trống';
            break;
          }
          if (index % 2 === 0) {
            if (!element.name) {
              messaage = 'Tên phần quà trống';
              break;
            }
          }
        }
      }
      if (messaage) {
        Alert.alert('Thông báo', messaage);
        return false;
      }
      return true;
    } catch (error) {}
  };
  return (
    <View style={{flex: 1}}>
      <Image
        resizeMode="cover"
        style={{width, height}}
        source={
          standByBackground
            ? {uri: standByBackground}
            : require('../assets/image/z5176770054393_b848428422d9132de84ee41669ed09d7.jpg')
        }
      />
      <TouchableOpacity onPress={onPlayPress} style={styles.btnPlay}>
        <Image
          resizeMode="contain"
          style={{
            width: width * 0.36,
            height: (width * 0.36) / 2,
          }}
          source={require('../assets/image/let-go.png')}
        />
      </TouchableOpacity>
      <Pressable style={styles.fab} onPress={onSettingPress} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  fab: {
    opacity: 0,
    position: 'absolute',
    bottom: 0,
    width: '30%',
    aspectRatio: 1,
    right: 0,
    backgroundColor: '#a5ce3a',
  },
  btnPlay: {
    position: 'absolute',
    width: width * 0.4,
    height: 60,
    bottom: 0.2 * height,
    left: 0.03 * width,
  },
});
