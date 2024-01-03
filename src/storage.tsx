import AsyncStorage from '@react-native-async-storage/async-storage';

export const storePassword = async (value: string) => {
  try {
    await AsyncStorage.setItem('password', value);
  } catch (e) {
    console.log('storePassword', e);
  }
};

export const getPassword = async () => {
  try {
    const value = await AsyncStorage.getItem('password');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('getPassword', e);
  }
};

export const savePassword = async (value: string) => {
  try {
    await AsyncStorage.setItem('savePassword', value);
  } catch (e) {
    console.log('savePassword', e);
  }
};

export const isSavePassword = async () => {
  try {
    const value = await AsyncStorage.getItem('savePassword');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('isSavePassword', e);
  }
};

export const storeArray = async (value: number[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('rates', jsonValue);
  } catch (e) {
    // saving error
    console.log('storeArray', e);
  }
};

export const getArray = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('rates');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('getArray', e);
  }
};
