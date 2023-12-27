import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const rates = [0, 0.2, 0.2, 0.6, 0, 0, 0, 0];
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

    const degress = (360 / rates.length) * selectedSegment + 10;
    console.log('degress', degress);

    rotationValue.value = 0;
    rotationValue.value = withTiming(40 * 360 - degress, {
      duration: 40 * 1000,
      // easing: Easing.bezier(0.42, 0, 0.58, 1),
      easing: Easing.out(Easing.quad),
    });
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
