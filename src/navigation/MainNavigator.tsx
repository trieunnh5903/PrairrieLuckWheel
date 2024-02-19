import React from 'react';
import {RootStackParamList} from '../type/navigation.type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AdminScreen, SignInScreen, WheelScreen} from '../screens';
import {LogBox} from 'react-native';
const Stack = createNativeStackNavigator<RootStackParamList>();

LogBox.ignoreAllLogs();
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Wheel" component={WheelScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
