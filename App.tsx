import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AdminScreen,
  ChangePasswordScreen,
  EnterPasswordScreen,
  SignInScreen,
  WheelScreen,
} from './src/screens';
import {PaperProvider} from 'react-native-paper';
import {RootStackParamList} from './src/type/navigation.type';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="EnterPassword">
            <Stack.Screen
              name="EnterPassword"
              component={EnterPasswordScreen}
            />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="Wheel" component={WheelScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
