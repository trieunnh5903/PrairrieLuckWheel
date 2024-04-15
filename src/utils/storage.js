import AsyncStorage from '@react-native-async-storage/async-storage';

const setObjData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.log('storeObjData', e);
  }
};

const getObject = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
    console.log('getObject', e);
  }
};

export const storage = {setObjData, getObject};
