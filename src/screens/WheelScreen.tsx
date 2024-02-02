import {
  Alert,
  Dimensions,
  Image,
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

type WheelScreenProps = NativeStackScreenProps<RootStackParamList, 'Wheel'>;
const prizes = [
  {id: 1, name: 'Bánh cá kem sầu riêng', angle: 0},
  {id: 2, name: 'Chúc bạn may mắn lần sau', angle: 45},
  {id: 3, name: 'Bánh đồng xu', angle: 90},
  {id: 4, name: 'Chúc bạn may mắn lần sau', angle: 135},
  {id: 5, name: 'Bánh cá kem nhãn', angle: 180},
  {id: 6, name: 'Chúc bạn may mắn lần sau', angle: 225},
  {id: 7, name: 'Phomai que', angle: 270},
  {id: 8, name: 'Chúc bạn may mắn lần sau', angle: 315},
];

const {width: screen_width} = Dimensions.get('window');

const WheelScreen = ({navigation}: WheelScreenProps) => {
  const [pressCount, setPressCount] = useState(0);
  const rates = useAppSelector(state => state.rates);

  const rotationValue = useSharedValue(0);
  const totalRate = rates.reduce((acc, rate) => acc + rate, 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [resultPrize, setResultPrize] = useState<string | undefined>();
  // event
  const showModal = (result: string | undefined) => {
    setResultPrize(result);
    setModalVisible(true);
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
    result: string | undefined,
  ) => {
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

  const onFinishAnimation = (result: string | undefined) => {
    if (!result) {
      Alert.alert('Thông báo', 'Hệ thống đang gặp sự cố vui lòng thử lại sau');
    } else {
      showModal(result);
    }
    setIsAnimating(false);
  };

  const determinePrize = (degress: number) => {
    switch (degress) {
      case 0:
        return prizes[0].name;
      case 45:
        return prizes[1].name;
      case 90:
        return prizes[2].name;
      case 135:
        return prizes[3].name;
      case 180:
        return prizes[4].name;
      case 225:
        return prizes[5].name;
      case 270:
        return prizes[6].name;
      case 315:
        return prizes[7].name;
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
    setPressCount(pressCount + 1);
    if (pressCount === 3) {
      navigation.navigate('SignIn');
    }

    setTimeout(() => {
      setPressCount(0);
    }, 3000);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
          <Text
            style={[
              styles.text,
              {fontSize: 20, fontWeight: 'bold'},
            ]}>{`Bạn đã trúng ${resultPrize}`}</Text>
          <Text style={styles.text}>
            Vui lòng like Fanpage để tiếp tục nhận thưởng theo QR Code sau
          </Text>

          <Image
            source={require('../assets/image/qrcode_www.facebook.com.png')}
            resizeMode="contain"
            style={{
              width: screen_width * 0.8,
              height: screen_width * 0.8,
            }}
          />
        </Modal>
      </Portal>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Image
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
        />
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
    </View>
  );
};

export default WheelScreen;

const styles = StyleSheet.create({
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
