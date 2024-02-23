import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppSelector} from '../redux/store';
import {CommonActions} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
const WelcomeScreen = ({navigation}) => {
  const rates = useAppSelector(state => state.rates);
  const storeImageGift = useAppSelector(state => state.giftImage);
  const rotateImage = useAppSelector(state => state.imageRotation);
  const storeImageBackround = useAppSelector(state => state.imageBackground);

  useEffect(() => {
    if (!rates || !storeImageGift || !rotateImage || !storeImageBackround) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
    return () => {};
  }, [navigation, rates, rotateImage, storeImageBackround, storeImageGift]);

  return (
    <View style={{flex: 1}}>
      <Image
        resizeMode="cover"
        style={{width, height}}
        source={require('../assets/image/z5176770054393_b848428422d9132de84ee41669ed09d7.jpg')}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Wheel')}
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
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  btnPlay: {
    position: 'absolute',
    width: width * 0.4,
    height: 60,
    bottom: 0.2 * height,
    left: 0.03 * width,
  },
});
