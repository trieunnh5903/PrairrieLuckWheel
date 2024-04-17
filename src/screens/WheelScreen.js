import {
  Dimensions,
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
import {Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {CustomerKey, ScreenName, storageKey} from '../constants';
import {getTimeNow, storage} from '../utils';
import {changeGiftResult} from '../redux/appSlice';

const {width: screen_width} = Dimensions.get('window');

const WheelScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const rates = useAppSelector(state => state.rates);
  const gifts = useAppSelector(state => state.gifts);
  const rotateImage = useAppSelector(state => state.imageRotation);
  const storeImageBackround = useAppSelector(state => state.imageBackground);
  const rotationValue = useSharedValue(0);
  const totalRate = rates.reduce((acc, rate) => acc + rate, 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const buttonSpin = useSharedValue(1);
  React.useEffect(() => {
    if (isPlaying) {
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
  }, [buttonSpin, isPlaying]);

  const saveHistory = async () => {
    try {
      const storedCustomerList = await storage.getObject(
        storageKey.customerList,
      );

      const lastCustomer = storedCustomerList[storedCustomerList.length - 1];
      // console.log('lastCustomer', lastCustomer);
      const updatedCustomer = {
        ...lastCustomer,
        [CustomerKey.BAT_DAU]: getTimeNow(),
      };
      // console.log('updatedCustomer', updatedCustomer);

      const updatedCustomerList = [
        ...storedCustomerList.slice(0, storedCustomerList.length - 1),
        updatedCustomer,
      ];
      await storage.setObjData(storageKey.customerList, updatedCustomerList);
    } catch (error) {
      console.log('saveHistory', error);
    }
  };

  const onStartPress = () => {
    if (!rotateImage) {
      return;
    }
    saveHistory();
    setIsPlaying(true);
    // generate degree
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
    const randomDegress = Math.floor(Math.random() * 31 + 10);
    const degressResult = (360 / rates.length) * selectedSegment;
    const degressRotate = degressResult + randomDegress;
    // console.log('degressRotate', degressRotate);
    // console.log('selectedSegment', selectedSegment);
    const gift = gifts[selectedSegment];
    console.log('gift', gift);
    // console.log('resultUri', resultUri);
    // console.log('result index', result);
    dispatch(changeGiftResult(gift));
    startAnimation(degressRotate);
  };

  const startAnimation = degressRotate => {
    rotationValue.value = 0;
    rotationValue.value = withTiming(
      10 * 360 - degressRotate,
      {
        duration: 10 * 1000,
        easing: Easing.out(Easing.quad),
      },
      finished => {
        if (finished) {
          runOnJS(onFinishAnimation)();
        }
      },
    );
  };

  const onFinishAnimation = () => {
    setIsPlaying(false);
    // console.log('giftResult', giftResult);
    navigation.navigate(ScreenName.GiftScreen);
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

  const spinAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: buttonSpin.value}],
    };
  });

  return (
    <ImageBackground
      resizeMode="cover"
      source={{uri: storeImageBackround}}
      style={styles.wrapper}>
      <View style={styles.container}>
        {rotateImage ? (
          <Animated.Image
            source={{uri: rotateImage}}
            style={[styles.wheel, wheelAnimatedStyle]}
          />
        ) : (
          <Text>Trống</Text>
        )}

        <Pressable
          disabled={isPlaying}
          onPress={onStartPress}
          style={styles.btnSpin}>
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
    </ImageBackground>
  );
};

export default WheelScreen;

const styles = StyleSheet.create({
  btnSpin: {
    position: 'absolute',
    transform: [
      {
        translateY: -screen_width * 0.4 * 0.1,
      },
      {scale: 0.9},
    ],
  },
  wheel: {
    width: screen_width * 0.8,
    height: screen_width * 0.8,
    borderRadius: screen_width,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
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
