import {Alert, Keyboard, Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomerKey, ScreenName, globalStyle, storageKey} from '../constants';
import {AppButton, AppTextInput} from '../component';
import {formatDate} from '../utils';

const CustomerInfoScreen = ({navigation}) => {
  const [invoiceCode, setInvoiceCode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    loadCustomerList();
  }, []);

  const loadCustomerList = async () => {
    try {
      const storedCustomerList = await AsyncStorage.getItem(
        storageKey.customerList,
      );
      if (storedCustomerList !== null) {
        setCustomerList(JSON.parse(storedCustomerList));
      }
    } catch (error) {
      console.error('Error loading customer list:', error);
    }
  };

  const handleInvoiceCodeChange = text => {
    setInvoiceCode(text);
  };

  const handleCustomerNameChange = text => {
    setCustomerName(text);
  };

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);
  };

  const handleSubmit = () => {
    if (!invoiceCode || !customerName || !phoneNumber) {
      Alert.alert('Thông báo', 'Vui lòng điền vào tất cả các trường.');
    } else if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Thông báo', 'Xin vui lòng nhập một số điện thoại hợp lệ.');
    } else if (isDuplicateInvoiceCode(invoiceCode)) {
      Alert.alert(
        'Thông báo',
        'Mã hóa đơn đã sử dụng. Vui lòng sử dụng một mã khác.',
      );
    } else {
      saveCustomerInformation();
    }
  };

  const saveCustomerInformation = async () => {
    try {
      const newCustomer = {
        [CustomerKey.STT]: (customerList.length + 1).toString(),
        [CustomerKey.NGAY]: formatDate(new Date()),
        [CustomerKey.MA_HD]: invoiceCode,
        [CustomerKey.BAT_DAU]: '',
        [CustomerKey.KET_THUC]: '',
        [CustomerKey.TEN_KHACH_HANG]: customerName,
        [CustomerKey.SĐT]: phoneNumber,
        [CustomerKey.KET_QUA]: '',
      };
      const updatedCustomerList = [...customerList, newCustomer];
      await AsyncStorage.setItem(
        storageKey.customerList,
        JSON.stringify(updatedCustomerList),
      );
      setCustomerList(updatedCustomerList);
      navigation.navigate(ScreenName.GameScreen);
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert(
        'Error',
        'Failed to save customer information. Please try again.',
      );
    }
  };

  const isDuplicateInvoiceCode = code => {
    return customerList.some(customer => customer[CustomerKey.MA_HD] === code);
  };

  const isValidPhoneNumber = phoneNumber => {
    return /^0\d{9}$/.test(phoneNumber);
  };

  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={[globalStyle.container, {gap: 16}]}>
      <AppTextInput
        placeholder="Mã hóa đơn"
        keyboardType="number-pad"
        value={invoiceCode}
        onChangeText={handleInvoiceCodeChange}
      />
      <AppTextInput
        placeholder="Tên khách hàng"
        value={customerName}
        onChangeText={handleCustomerNameChange}
      />
      <AppTextInput
        placeholder="Số điện thoại"
        keyboardType="number-pad"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
      />

      <AppButton label="Xác nhận" onPress={handleSubmit} />
    </Pressable>
  );
};

export default CustomerInfoScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
