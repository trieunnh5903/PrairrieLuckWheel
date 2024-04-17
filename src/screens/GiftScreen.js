import {BackHandler, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppSelector} from '../redux/store';
import {getTimeNow, storage} from '../utils';
import {CustomerKey, ScreenName, storageKey} from '../constants';

const GiftScreen = ({navigation}) => {
  const giftResult = useAppSelector(state => state.giftResult);
  // console.log('giftResult', giftResult);
  useEffect(() => {
    const saveCustomerInformation = async () => {
      try {
        const storedCustomerList = await storage.getObject(
          storageKey.customerList,
        );

        const lastCustomer = storedCustomerList[storedCustomerList.length - 1];
        const updatedCustomer = {
          ...lastCustomer,
          [CustomerKey.KET_QUA]: giftResult.name || 'Chúc bạn may mắn lần sau',
          [CustomerKey.KET_THUC]: getTimeNow(),
        };

        const updatedCustomerList = [
          ...storedCustomerList.slice(0, storedCustomerList.length - 1),
          updatedCustomer,
        ];

        storage.setObjData(storageKey.customerList, updatedCustomerList);
      } catch (error) {
        console.log(error);
      }
    };
    saveCustomerInformation();
  }, [giftResult.name]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(ScreenName.WelcomeScreen);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Image
        resizeMode="cover"
        source={{uri: giftResult.uri}}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default GiftScreen;

const styles = StyleSheet.create({});
