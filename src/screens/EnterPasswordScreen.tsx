import {Keyboard, Pressable, ScrollView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../type/navigation.type';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {changeIsSavedPassword, savePassword} from '../redux/appSlice';

const EnterPasswordScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const currPassword = useAppSelector(state => state.password);

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onPress = async () => {
    if (password.length < 8 || password.trim().length < 8) {
      setError('Mật khẩu chứa ít nhất 8 ký tự');
      return;
    }
    setError('');
    dispatch(savePassword(password));
    dispatch(changeIsSavedPassword(true));
  };

  useEffect(() => {
    if (currPassword) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Admin'}],
        }),
      );
    }
    return () => {};
  }, [currPassword, navigation]);

  return (
    <ScrollView>
      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={{justifyContent: 'center', flex: 1, padding: 20}}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
          Mật khẩu dùng để thay đổi tỉ lệ
        </Text>

        <TextInput
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
          style={{
            color: 'red',
            fontWeight: 'bold',
            marginTop: 4,
            fontSize: 14,
          }}>
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
    </ScrollView>
  );
};

export default EnterPasswordScreen;
