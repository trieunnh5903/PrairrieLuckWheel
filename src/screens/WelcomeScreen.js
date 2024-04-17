import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../redux/store';
import {CommonActions} from '@react-navigation/native';
import {ScreenName} from '../constants';

const {height, width} = Dimensions.get('window');
const WelcomeScreen = ({navigation}) => {
  const rates = useAppSelector(state => state.rates);
  const storeImageGift = useAppSelector(state => state.giftImage);
  const rotateImage = useAppSelector(state => state.imageRotation);
  const storeImageBackround = useAppSelector(state => state.imageBackground);
  const [pressCount, setPressCount] = useState(0);

  // useEffect(() => {
  //   if (!rates || !storeImageGift || !rotateImage || !storeImageBackround) {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 1,
  //         routes: [{name: ScreenName.PasswordScreen}],
  //       }),
  //     );
  //   }
  //   return () => {};
  // }, [navigation, rates, rotateImage, storeImageBackround, storeImageGift]);

  const onSettingPress = () => {
    setPressCount(pressCount + 1);
    if (pressCount === 4) {
      navigation.navigate(ScreenName.HistoryScreen);
    }

    setTimeout(() => {
      setPressCount(0);
    }, 3000);
  };

  return (
    <View style={{flex: 1}}>
      <Image
        resizeMode="cover"
        style={{width, height}}
        source={require('../assets/image/z5176770054393_b848428422d9132de84ee41669ed09d7.jpg')}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.CustomerInfoScreen)}
        style={styles.btnPlay}>
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
