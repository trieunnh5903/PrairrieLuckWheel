import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AdminScreen,
  ChangePassword,
  CustomerInfoScreen,
  GiftScreen,
  HistoryScreen,
  LocationScreen,
  ManagerScreen,
  RateScreen,
  SignInScreen,
  StandByImage,
  StorageScreen,
  WelcomeScreen,
  WheelScreen,
} from '../screens';
import {LogBox} from 'react-native';
import {ScreenName, colors} from '../constants';
const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: 'white',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name={ScreenName.WelcomeScreen}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenName.GameScreen}
        options={{headerShown: false}}
        component={WheelScreen}
      />
      <Stack.Screen
        name={ScreenName.GiftScreen}
        options={{headerShown: false}}
        component={GiftScreen}
      />
      <Stack.Screen name={ScreenName.PasswordScreen} component={SignInScreen} />
      <Stack.Screen
        name={ScreenName.ImageSettingScreen}
        component={AdminScreen}
      />
      <Stack.Screen
        name={ScreenName.CustomerInfoScreen}
        component={CustomerInfoScreen}
        options={{headerTitle: 'Thông tin khách hàng'}}
      />

      <Stack.Screen
        name={ScreenName.HistoryScreen}
        component={HistoryScreen}
        options={{headerShown: true, headerTitle: 'Lịch sử khách hàng'}}
      />

      <Stack.Screen
        name={ScreenName.LocationScreen}
        component={LocationScreen}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name={ScreenName.StorageScreen}
        component={StorageScreen}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name={ScreenName.StandByImage}
        component={StandByImage}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name={ScreenName.ChangePassword}
        component={ChangePassword}
        options={{headerShown: true}}
      />

      <Stack.Screen name={ScreenName.ManagerScreen} component={ManagerScreen} />
      <Stack.Screen name={ScreenName.RateScreen} component={RateScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
