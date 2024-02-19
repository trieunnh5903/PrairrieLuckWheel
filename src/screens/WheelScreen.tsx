import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Modal, Portal, Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../type/navigation.type';
import {useAppSelector} from '../redux/store';
import {screen_height} from '../constants';

type WheelScreenProps = NativeStackScreenProps<RootStackParamList, 'Wheel'>;

const {width: screen_width} = Dimensions.get('window');

const WheelScreen = ({navigation}: WheelScreenProps) => {
  const [pressCount, setPressCount] = useState(0);
  const rates = useAppSelector(state => state.rates);
  const rotateImage = useAppSelector(state => state.imageRotation);
  const rotationValue = useSharedValue(0);
  const totalRate = rates.reduce((acc, rate) => acc + rate, 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [resultPrize, setResultPrize] = useState<string | undefined>();
  const storeImageGift = useAppSelector(state => state.giftImage);

  // event
  const showModal = (result: number | undefined) => {
    if (result) {
      setResultPrize(storeImageGift[result]);
      setModalVisible(true);
    }
  };

  const hideModal = () => setModalVisible(false);

  const onStartPress = () => {
    setIsAnimating(true);
    const randomRate = Math.random() * totalRate;
    let cumulativeRate = 0;
    let selectedSegment = 0;
    for (let index = 0; index < rates.length; index++) {
      const element = rates[index];
      cumulativeRate += element;
      if (randomRate < cumulativeRate) {
        selectedSegment = index;
        break;
      }
    }
    // Generate a random number between 10 and 40
    const randomNum = Math.floor(Math.random() * 31 + 10);
    const degressResult = (360 / rates.length) * selectedSegment;
    const degressRotate = (360 / rates.length) * selectedSegment + randomNum;
    const result = determinePrize(degressResult);
    startAnimation(degressRotate, result);
  };

  const startAnimation = (
    degressRotate: number,
    result: number | undefined,
  ) => {
    console.log('result', result);

    rotationValue.value = 0;
    rotationValue.value = withTiming(
      10 * 360 - degressRotate,
      {
        duration: 10 * 1000,
        easing: Easing.out(Easing.quad),
      },
      finished => {
        if (finished) {
          runOnJS(onFinishAnimation)(result);
        }
      },
    );
  };

  const onFinishAnimation = (result: number | undefined) => {
    if (result === undefined) {
      Alert.alert('Thông báo', 'Hệ thống đang gặp sự cố vui lòng thử lại sau');
    } else {
      showModal(result);
    }
    setIsAnimating(false);
  };

  const determinePrize = (degress: number) => {
    console.log(degress);

    switch (degress) {
      case 0:
        // return prizes[0].name;
        return 0;
      case 45:
        // return prizes[1].name;
        return 1;
      case 90:
        // return prizes[2].name;
        return 2;
      case 135:
        // return prizes[3].name;
        return 3;
      case 180:
        // return prizes[4].name;
        return 4;
      case 225:
        // return prizes[5].name;
        return 5;
      case 270:
        // return prizes[6].name;
        return 6;
      case 315:
        // return prizes[7].name;
        return 7;
      default:
        break;
    }
  };

  const wheelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: rotationValue.value + 'deg',
        },
      ],
    };
  });

  const buttonSpin = useSharedValue(1);
  React.useEffect(() => {
    if (isAnimating) {
      cancelAnimation(buttonSpin);
    } else {
      buttonSpin.value = 1;
      buttonSpin.value = withRepeat(
        withDelay(
          1000,
          withSequence(withTiming(0.9), withTiming(1, {duration: 900})),
        ),
        -1,
      );
    }
  }, [buttonSpin, isAnimating]);

  const spinAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: buttonSpin.value}],
    };
  });

  const onSettingPress = () => {
    if (isAnimating) {
      return;
    }
    setPressCount(pressCount + 1);
    if (pressCount === 3) {
      navigation.navigate('SignIn');
    }

    setTimeout(() => {
      setPressCount(0);
    }, 3000);
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../assets/image/bg.jpg')}
      style={styles.container}>
      <Portal>
        <Modal
          visible={modalVisible}
          contentContainerStyle={{
            width: screen_width,
            height: screen_height,
          }}
          onDismiss={hideModal}>
          <View
            style={{
              backgroundColor: 'red',
            }}>
            <Image
              source={{uri: resultPrize}}
              resizeMode="contain"
              style={{
                width: screen_width,
                height: screen_width,
              }}
            />
          </View>
          {/* <Text
            style={[
              styles.text,
              {fontSize: 20, fontWeight: 'bold'},
            ]}>{`Bạn đã trúng ${resultPrize}`}</Text>
          <Text style={styles.text}>
            Vui lòng like Fanpage để tiếp tục nhận thưởng theo QR Code sau
          </Text>*/}
        </Modal>
      </Portal>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {rotateImage ? (
          <Animated.Image
            source={{uri: rotateImage}}
            style={[
              {
                width: screen_width * 0.8,
                height: screen_width * 0.8,
                borderRadius: screen_width,
                backgroundColor: 'rgba(0,0,0,0.1)',
              },
              wheelAnimatedStyle,
            ]}
          />
        ) : (
          <Text>Trống</Text>
        )}

        {/* <Animated.Image
          source={require('../assets/image/bg_vqmm.png')}
          style={[
            {
              width: screen_width * 0.8,
              height: screen_width * 0.8,
              borderRadius: screen_width,
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
            wheelAnimatedStyle,
          ]}
        /> */}
        <Pressable
          disabled={isAnimating}
          onPress={onStartPress}
          style={{
            position: 'absolute',
            transform: [
              {
                translateY: -screen_width * 0.4 * 0.1,
              },
              {scale: 0.9},
            ],
          }}>
          <Animated.Image
            style={[
              {
                width: screen_width * 0.4,
                height: screen_width * 0.4,
              },
              spinAnimatedStyle,
            ]}
            source={require('../assets/image/kim-vqmm.png')}
          />
        </Pressable>
      </View>

      <Pressable style={styles.fab} onPress={onSettingPress} />
    </ImageBackground>
  );
};

export default WheelScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 20,
    padding: 16,
  },
  fab: {
    opacity: 0,
    position: 'absolute',
    bottom: 0,
    width: '30%',
    aspectRatio: 1,
    right: 0,
    backgroundColor: '#a5ce3a',
  },
});
