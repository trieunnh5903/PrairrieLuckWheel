import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const rates = [0.4, 0.2, 0.2, 0.6, 0, 0, 0, 0];

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
const App = () => {
  const rotationValue = useSharedValue(0);
  const totalRate = rates.reduce((acc, rate) => acc + rate, 0);

  // event
  const onStartPress = () => {
    const randomRate = Math.random() * totalRate;
    // console.log('randomRate', randomRate);

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
    console.log('degressResult', degressResult);
    console.log('degressRotate', degressRotate);
    const result = determinePrize(degressResult);
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
          runOnJS(showNotification)(result);
        }
      },
    );
  };

  const showNotification = (message: string | undefined) => {
    if (message) {
      Alert.alert('Thông báo', `Bạn đã trúng ${message}`);
    } else {
      Alert.alert('Thông báo', 'Hệ thống đang gặp sự cố vui lòng thử lại sau}');
    }
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
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Animated.Image
          source={require('./src/assets/image/VQMMExport.png')}
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
        <View style={styles.triangleContainer} />
      </View>
      <TouchableOpacity
        onPress={onStartPress}
        style={{padding: 20, margin: 20, backgroundColor: 'yellow'}}>
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  triangleContainer: {
    position: 'absolute',
    top: -10,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 30,
    borderTopColor: 'red',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
