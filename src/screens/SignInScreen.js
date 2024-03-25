import {Keyboard, Pressable, Text} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/store';

const EnterPasswordScreen = () => {
  const navigation = useNavigation();
  const currPassword = useAppSelector(state => state.password);

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onPress = async () => {
    if (password.length < 8 || password.trim().length < 8) {
      setError('Mật khẩu chứa ít nhất 8 ký tự');
      return;
    }

    if (password !== currPassword) {
      setError('Mật khẩu không đúng');
      return;
    }
    setError('');
    navigation.navigate('Admin');
  };

  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={{justifyContent: 'center', flex: 1, padding: 20}}>
      <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
        Mật khẩu
      </Text>
      <TextInput
        keykeyboardType="numeric"
        secureTextEntry={true}
        style={{marginTop: 16}}
        label="Mật khẩu"
        contentStyle={{backgroundColor: 'white'}}
        underlineColor="#a5ce3a"
        activeUnderlineColor="#a5ce3a"
        textColor="black"
        onChangeText={text => setPassword(text)}
        error={error.length > 0}
      />
      <Text
        style={{color: 'red', fontWeight: 'bold', marginTop: 4, fontSize: 14}}>
        {error}
      </Text>

      <Button
        style={{margin: 20}}
        onPress={onPress}
        mode="contained"
        buttonColor="#a5ce3a"
        textColor="black">
        OK
      </Button>
    </Pressable>
  );
};

export default EnterPasswordScreen;
