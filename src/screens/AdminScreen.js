import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button, DataTable, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {
  changeImageBackground,
  changeImageCell,
  changeImageRotation,
  changeRates,
} from '../redux/appSlice';
import {screen_width} from '../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import MyButton from '../component/MyButton';

const AdminScreen = () => {
  const imageRoration = useAppSelector(state => state.imageRotation);
  const storeImageGift = useAppSelector(state => state.giftImage);
  const storeImageBackround = useAppSelector(state => state.imageBackground);
  const currRates = useAppSelector(state => state.rates);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [errorMess, setErrorMess] = useState('');
  const [rates, setRates] = useState(currRates);
  const [rotationImage, setRotationImage] = useState(imageRoration);
  const [imageGift, setImageGift] = useState(storeImageGift);
  const [imageBackground, setImageBackground] = useState(storeImageBackround);

  const onSubmitPress = () => {
    const isValid = validate();
    if (isValid) {
      dispatch(changeRates(rates));
      if (rotationImage) {
        dispatch(changeImageRotation(rotationImage));
      }
      dispatch(changeImageCell(imageGift));

      if (imageBackground) {
        dispatch(changeImageBackground(imageBackground));
      }
      navigation.navigate('Wheel');
    }
  };

  const validate = () => {
    // CHECK NUMBER
    for (let i = 0; i < rates.length; i++) {
      if (isNaN(rates[i])) {
        setErrorMess('Hãy nhập giá trị số');
        Alert.alert('', 'Tỉ lệ là giá trị số');
        return false;
      }
    }

    // CHECK MIN MAX RATE
    let totalRate = 0;

    for (let i = 0; i < rates.length; i++) {
      if (i % 2 === 0) {
        // Chỉ số chẵn
        totalRate += rates[i];
      }
    }
    if (totalRate > 50) {
      setErrorMess('Tổng tỉ lệ phần quà không quá 50%');
      Alert.alert('', 'Tổng tỉ lệ phần quà không quá 50%');
      return false;
    }

    if (!imageBackground) {
      Alert.alert('', 'Ảnh nền đang trống');
      return false;
    }

    if (!rotationImage) {
      Alert.alert('', 'Ảnh vòng quay đang trống');
      return false;
    }

    // check image gift
    for (let index = 0; index < imageGift.length; index++) {
      const element = imageGift[index];
      if (!element) {
        Alert.alert('', 'Ảnh phần quà đang trống');
        return false;
      }
    }

    setErrorMess('');
    return true;
  };

  const onChangeText = (text, index) => {
    let newRate = [...rates];
    newRate[index] = Number(text);
    let totalRate = 0;
    for (let i = 0; i < newRate.length; i++) {
      if (i % 2 === 0) {
        // Chỉ số chẵn
        totalRate += newRate[i];
      }
    }
    const unluckyRate = (100 - totalRate) / 4;
    newRate[1] = unluckyRate;
    newRate[3] = unluckyRate;
    newRate[5] = unluckyRate;
    newRate[7] = unluckyRate;
    setRates(newRate);
  };

  const handleChangeImageSpin = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo', quality: 1});
    if (assets) {
      const uri = assets[0].uri;
      setRotationImage(uri);
    }
  };

  const handleChangeGift = async cellNumber => {
    const {assets} = await launchImageLibrary({mediaType: 'photo', quality: 1});
    if (assets) {
      const uri = assets[0].uri;
      let newGift = [...imageGift];
      newGift[cellNumber] = uri;
      setImageGift(newGift);
    }
  };

  const handleChangeBackground = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo', quality: 1});
    if (assets) {
      const uri = assets[0].uri;
      setImageBackground(uri);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <Pressable
          style={{backgroundColor: 'white'}}
          onPress={() => Keyboard.dismiss()}>
          <View style={{padding: 20}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Mô tả vòng quay (Các phần được đánh số thứ tự)
            </Text>
            <Image
              source={require('../assets/image/tutorial.png')}
              resizeMode="contain"
              style={{
                width: screen_width * 0.6,
                height: screen_width * 0.6,
                marginTop: 10,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 10,
              }}>
              Tỉ lệ phần thưởng
            </Text>
            {/* tabel */}
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={styles.textTitle}>
                  Phần
                </DataTable.Title>

                <DataTable.Title numeric textStyle={styles.textTitle}>
                  Tỉ lệ (%)
                </DataTable.Title>
              </DataTable.Header>

              {rates.map((item, index) => {
                return (
                  <DataTable.Row
                    key={index}
                    style={
                      errorMess
                        ? {borderBottomColor: 'red', borderBottomWidth: 1}
                        : {}
                    }>
                    <DataTable.Cell
                      style={{
                        flex: 4,
                      }}
                      textStyle={styles.textBody}>
                      Số {index + 1}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TextInput
                        style={{color: 'black'}}
                        keyboardType="number-pad"
                        onChangeText={value => onChangeText(value, index)}
                        value={rates[index].toString()}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                );
                // if (index === 0) {
                //   return (
                //     <DataTable.Row
                //       key={index}
                //       style={
                //         errorMess
                //           ? {borderBottomColor: 'red', borderBottomWidth: 1}
                //           : {}
                //       }>
                //       <DataTable.Cell
                //         style={{
                //           flex: 4,
                //         }}
                //         textStyle={styles.textBody}>
                //         Số 1
                //       </DataTable.Cell>
                //       <DataTable.Cell numeric>
                //         <TextInput
                //           style={{color: 'black'}}
                //           keyboardType="number-pad"
                //           onChangeText={value => onChangeText(value, index)}
                //           value={rates[index].toString()}
                //         />
                //       </DataTable.Cell>
                //     </DataTable.Row>
                //   );
                // }
                // if (index === 1) {
                //   return (
                //     <DataTable.Row key={index}>
                //       <DataTable.Cell
                //         style={{
                //           flex: 4,
                //         }}
                //         textStyle={[styles.textBody, {color: 'gray'}]}>
                //         Chúc may mắn lần sau
                //       </DataTable.Cell>
                //       <DataTable.Cell numeric>
                //         <TextInput
                //           editable={false}
                //           style={{color: 'gray'}}
                //           keyboardType="number-pad"
                //           onChangeText={value => onChangeText(value, index)}
                //           defaultValue={rates[index].toString()}
                //         />
                //       </DataTable.Cell>
                //     </DataTable.Row>
                //   );
                // }
                // if (index === 2) {
                //   return (
                //     <DataTable.Row
                //       key={index}
                //       style={
                //         errorMess
                //           ? {borderBottomColor: 'red', borderBottomWidth: 1}
                //           : {}
                //       }>
                //       <DataTable.Cell
                //         style={{
                //           flex: 4,
                //         }}
                //         textStyle={styles.textBody}>
                //         Bánh đồng xu
                //       </DataTable.Cell>
                //       <DataTable.Cell numeric>
                //         <TextInput
                //           style={{color: 'black'}}
                //           keyboardType="number-pad"
                //           onChangeText={value => onChangeText(value, index)}
                //           defaultValue={rates[index].toString()}
                //         />
                //       </DataTable.Cell>
                //     </DataTable.Row>
                //   );
                // }
                // if (index === 3) {
                //   return (
                //     <DataTable.Row key={index}>
                //       <DataTable.Cell
                //         style={{
                //           flex: 4,
                //         }}
                //         textStyle={[styles.textBody, {color: 'gray'}]}>
                //         Chúc may mắn lần sau
                //       </DataTable.Cell>
                //       <DataTable.Cell numeric>
                //         <TextInput
                //           editable={false}
                //           style={{color: 'gray'}}
                //           keyboardType="number-pad"
                //           onChangeText={value => onChangeText(value, index)}
                //           defaultValue={rates[index].toString()}
                //         />
                //       </DataTable.Cell>
                //     </DataTable.Row>
                //   );
                // }
                // if (index === 4) {
                //   return (
                //     <DataTable.Row
                //       key={index}
                //       style={
                //         errorMess
                //           ? {borderBottomColor: 'red', borderBottomWidth: 1}
                //           : {}
                //       }>
                //       <DataTable.Cell
                //         style={{
                //           flex: 4,
                //         }}
                //         textStyle={{color: 'black', fontSize: 16}}>
                //         Bánh cá kem nhãn
                //       </DataTable.Cell>
                //       <DataTable.Cell numeric>
                //         <TextInput
                //           style={{color: 'black'}}
                //           keyboardType="number-pad"
                //           onChangeText={value => onChangeText(value, index)}
                //           defaultValue={rates[index].toString()}
                //         />
                //       </DataTable.Cell>
                //     </DataTable.Row>
                //   );
                // }
                // if (index === 5) {
                //   return (
                //     <DataTable.Row key={index}>
                //       <DataTable.Cell
                //         style={{
                //           flex: 4,
                //         }}
                //         textStyle={[styles.textBody, {color: 'gray'}]}>
                //         Chúc may mắn lần sau
                //       </DataTable.Cell>
                //       <DataTable.Cell numeric>
                //         <TextInput
                //           editable={false}
                //           style={{color: 'gray'}}
                //           keyboardType="number-pad"
                //           onChangeText={value => onChangeText(value, index)}
                //           defaultValue={rates[index].toString()}
                //         />
                //       </DataTable.Cell>
                //     </DataTable.Row>
                //   );
                // }
                // if (index === 6) {
                //   return (
                //     <DataTable.Row
                //       key={index}
                //       style={
                //         errorMess
                //           ? {borderBottomColor: 'red', borderBottomWidth: 1}
                //           : {}
                //       }>
                //       <DataTable.Cell
                //         style={{
                //           flex: 4,
                //         }}
                //         textStyle={{color: 'black', fontSize: 16}}>
                //         Phomai que
                //       </DataTable.Cell>
                //       <DataTable.Cell numeric>
                //         <TextInput
                //           style={{color: 'black'}}
                //           keyboardType="number-pad"
                //           onChangeText={value => onChangeText(value, index)}
                //           defaultValue={rates[index].toString()}
                //         />
                //       </DataTable.Cell>
                //     </DataTable.Row>
                //   );
                // }
                // if (index === 7) {
                //   return (
                //     <DataTable.Row key={index}>
                //       <DataTable.Cell
                //         style={{
                //           flex: 4,
                //         }}
                //         textStyle={[styles.textBody, {color: 'gray'}]}>
                //         Chúc may mắn lần sau
                //       </DataTable.Cell>
                //       <DataTable.Cell numeric>
                //         <TextInput
                //           editable={false}
                //           style={{color: 'gray'}}
                //           keyboardType="number-pad"
                //           onChangeText={value => onChangeText(value, index)}
                //           defaultValue={rates[index].toString()}
                //         />
                //       </DataTable.Cell>
                //     </DataTable.Row>
                //   );
                // }
              })}
            </DataTable>
            {/* background */}
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 20,
              }}>
              Hình ảnh nền
            </Text>
            <View
              style={{
                width: screen_width * 0.6,
                height: screen_width * 0.6,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {imageBackground ? (
                <Image
                  source={{uri: imageBackground}}
                  resizeMode="contain"
                  style={{
                    width: screen_width * 0.6,
                    height: screen_width * 0.6,
                  }}
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6,
                    borderColor: 'lightgray',
                    width: '100%',
                    height: '100%',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    Trống
                  </Text>
                </View>
              )}
            </View>
            <Button
              onPress={handleChangeBackground}
              style={{marginVertical: 20, alignSelf: 'flex-start'}}
              mode="contained"
              buttonColor="#a5ce3a"
              textColor="black">
              Thay đổi
            </Button>
            {/* img spin */}
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 20,
              }}>
              Hình ảnh vòng quay
            </Text>
            <View
              style={{
                width: screen_width * 0.6,
                height: screen_width * 0.6,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {rotationImage ? (
                <Image
                  source={{uri: rotationImage}}
                  resizeMode="contain"
                  style={{
                    width: screen_width * 0.6,
                    height: screen_width * 0.6,
                  }}
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6,
                    borderColor: 'lightgray',
                    width: '100%',
                    height: '100%',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    Trống
                  </Text>
                </View>
              )}
            </View>
            <Button
              onPress={handleChangeImageSpin}
              style={{marginVertical: 20, alignSelf: 'flex-start'}}
              mode="contained"
              buttonColor="#a5ce3a"
              textColor="black">
              Thay đổi
            </Button>
            {/* image gift */}
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Hình ảnh phần thưởng
            </Text>
            {/* cell 1 */}
            {imageGift.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.subtitle}>Phần số {index + 1}</Text>
                  <View style={styles.giftWrapper}>
                    {item ? (
                      <Image
                        source={{uri: item}}
                        resizeMode="contain"
                        style={{
                          width: screen_width * 0.6,
                          height: screen_width * 0.6,
                        }}
                      />
                    ) : (
                      <View style={styles.imageGift}>
                        <Text style={styles.subtitle}>Trống</Text>
                      </View>
                    )}
                  </View>
                  <MyButton
                    label="Thay đổi"
                    onPress={() => handleChangeGift(index)}
                  />
                </View>
              );
            })}

            {/* submit */}
            <Button
              style={{margin: 20}}
              onPress={onSubmitPress}
              mode="contained"
              buttonColor="#a5ce3a"
              textColor="black">
              Đồng ý
            </Button>
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  imageGift: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: 'lightgray',
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  giftWrapper: {
    width: screen_width * 0.6,
    height: screen_width * 0.6,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textBody: {
    color: 'black',
    fontSize: 16,
  },

  textTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 20,
    padding: 16,
  },
  fab: {
    opacity: 0,
    position: 'absolute',
    bottom: 0,
    width: '30%',
    aspectRatio: 1,
    right: 0,
    backgroundColor: '#a5ce3a',
  },
});
