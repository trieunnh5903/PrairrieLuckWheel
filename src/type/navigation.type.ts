import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Admin: undefined;
  ChangePassword: undefined;
  SignIn: undefined;
  Wheel: undefined;
  EnterPassword: undefined;
  Welcome: undefined;
  CustomerInfo: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
