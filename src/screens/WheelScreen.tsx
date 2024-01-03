import {Alert, Dimensions, Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Button, FAB, Modal, Portal, Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../type/navigation.type';
import {useAppSelector} from '../redux/store';

const prizes = [
  {id: 1, name: 'Giải nhất', angle: 0},
  {id: 2, name: 'Giải 2', angle: 45},
  {id: 3, name: 'Giải 3', angle: 90},
  {id: 4, name: 'Giải 4', angle: 135},
  {id: 5, name: 'Giải 5', angle: 180},
  {id: 6, name: 'Giải 6', angle: 225},
  {id: 7, name: 'Giải 7', angle: 270},
  {id: 8, name: 'Giải 8', angle: 315},
];

const {width: screen_width} = Dimensions.get('window');

type WheelScreenProps = NativeStackScreenProps<RootStackParamList, 'Wheel'>;
const WheelScreen = ({navigation}: WheelScreenProps) => {
  const rates = useAppSelector(state => state.app.rates);
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
        // easing: Easing.bezier(0.42, 0, 0.58, 1),
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

  const onSettingPress = () => navigation.navigate('SignIn');
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
              width: 300,
              height: 300,
              borderRadius: 200,
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
            wheelAnimatedStyle,
          ]}
        />
        <View
          style={{
            position: 'absolute',
            transform: [
              {
                translateY: -15,
              },
            ],
          }}>
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={require('../assets/image/kim-vqmm.png')}
          />
        </View>
      </View>
      <Button
        style={{margin: 20}}
        disabled={isAnimating}
        onPress={onStartPress}
        mode="contained"
        buttonColor="lightgreen"
        textColor="black">
        Bắt đầu
      </Button>

      <FAB
        mode="flat"
        icon="cog-outline"
        style={styles.fab}
        color="black"
        onPress={onSettingPress}
      />
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
    position: 'absolute',
    bottom: 0,
    margin: 20,
    right: 0,
    backgroundColor: 'lightgreen',
  },
});
