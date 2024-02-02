import React from 'react';
import {RootStackParamList} from '../type/navigation.type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AdminScreen,
  ChangePasswordScreen,
  EnterPasswordScreen,
  SignInScreen,
  WheelScreen,
} from '../screens';
import {LogBox} from 'react-native';
const Stack = createNativeStackNavigator<RootStackParamList>();

LogBox.ignoreAllLogs();
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Wheel" component={WheelScreen} />
      <Stack.Screen name="EnterPassword" component={EnterPasswordScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
