import {Keyboard, Pressable, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppButton, AppTextInput} from '../component';
import {ScreenName, globalStyle} from '../constants';
import {useAppSelector} from '../redux/store';

const EnterPasswordScreen = () => {
  const navigation = useNavigation();
  const correctPassword = useAppSelector(state => state.password);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onPress = async () => {
    if (password !== correctPassword) {
      setError('Mật khẩu không đúng');
      return;
    }
    setError('');
    navigation.navigate(ScreenName.ManagerScreen);
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={globalStyle.container}>
      <Text style={globalStyle.textWhiteBold}>Mật khẩu</Text>

      <AppTextInput
        secureTextEntry={true}
        style={{marginTop: 16}}
        onChangeText={text => setPassword(text)}
      />
      <Text
        style={{
          color: 'darkred',
          fontWeight: 'bold',
          marginTop: 4,
          fontSize: 14,
        }}>
        {error}
      </Text>

      <AppButton style={{marginTop: 10}} onPress={onPress} label="OK" />
    </Pressable>
  );
};

export default EnterPasswordScreen;
