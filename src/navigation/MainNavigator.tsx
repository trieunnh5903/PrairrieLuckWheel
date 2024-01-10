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
import {useAppSelector} from '../redux/store';
import {LogBox} from 'react-native';
const Stack = createNativeStackNavigator<RootStackParamList>();

LogBox.ignoreAllLogs();
const MainNavigator = () => {
  const isSavedPassword = useAppSelector(state => state.isSavedPassword);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isSavedPassword ? (
        <Stack.Group>
          <Stack.Screen name="Wheel" component={WheelScreen} />
          <Stack.Screen name="EnterPassword" component={EnterPasswordScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="EnterPassword" component={EnterPasswordScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="Wheel" component={WheelScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
