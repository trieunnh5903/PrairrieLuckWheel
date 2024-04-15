import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeLocation} from '../redux/appSlice';
import {globalStyle} from '../constants';
import {AppTextInput} from '../component';

const LocationScreen = ({navigation}) => {
  const location = useSelector(state => state.location);
  const dispatch = useDispatch();
  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={globalStyle.container}>
      <Text style={[globalStyle.textWhite, {marginBottom: 10}]}>
        Điểm bán hiện tại
      </Text>
      <AppTextInput
        value={location}
        onChangeText={text => dispatch(changeLocation(text))}
        placeholder="Điểm bán hiện tại"
      />
    </Pressable>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({});
