import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
// import {Button, DataTable, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {
  changeImageBackground,
  changeImageCell,
  changeImageRotation,
  changeRates,
} from '../redux/appSlice';
import {colors, globalStyle, screen_width} from '../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {AppButton} from '../component';

const AdminScreen = () => {
  const imageRoration = useAppSelector(state => state.imageRotation);
  const imageGift = useAppSelector(state => state.giftImage);
  const storeImageBackround = useAppSelector(state => state.imageBackground);
  const currRates = useAppSelector(state => state.rates);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // const [errorMess, setErrorMess] = useState('');
  // const [rates, setRates] = useState(currRates);
  // const [rotationImage, setRotationImage] = useState(imageRoration);
  // const [imageGift, setImageGift] = useState(storeImageGift);
  // const [imageBackground, setImageBackground] = useState(storeImageBackround);

  // const onSubmitPress = () => {
  //   const isValid = validate();
  //   if (isValid) {
  //     dispatch(changeRates(rates));
  //     if (rotationImage) {
  //       dispatch(changeImageRotation(rotationImage));
  //     }
  //     dispatch(changeImageCell(imageGift));

  //     if (imageBackground) {
  //       dispatch(changeImageBackground(imageBackground));
  //     }
  //     navigation.navigate('Wheel');
  //   }
  // };

  // const validate = () => {
  //   // CHECK NUMBER
  //   for (let i = 0; i < rates.length; i++) {
  //     if (isNaN(rates[i])) {
  //       setErrorMess('Hãy nhập giá trị số');
  //       Alert.alert('', 'Tỉ lệ phần quà là giá trị số');
  //       return false;
  //     }
  //   }

  //   // CHECK MIN MAX RATE
  //   let totalRate = 0;

  //   for (let i = 0; i < rates.length; i++) {
  //     if (i % 2 === 0) {
  //       // Chỉ số chẵn
  //       totalRate += rates[i];
  //     }
  //   }
  //   if (totalRate > 50) {
  //     setErrorMess('Tổng tỉ lệ phần quà không quá 50%');
  //     Alert.alert('', 'Tổng tỉ lệ phần quà không quá 50%');
  //     return false;
  //   }

  //   if (!imageBackground) {
  //     Alert.alert('', 'Ảnh nền đang trống');
  //     return false;
  //   }

  //   if (!rotationImage) {
  //     Alert.alert('', 'Ảnh vòng quay đang trống');
  //     return false;
  //   }

  //   // check image gift
  //   for (let index = 0; index < imageGift.length; index++) {
  //     const element = imageGift[index];
  //     if (!element) {
  //       Alert.alert('', 'Ảnh phần quà đang trống');
  //       return false;
  //     }
  //   }

  //   setErrorMess('');
  //   return true;
  // };

  // const onChangeText = (text, index) => {
  //   let newRate = [...rates];
  //   newRate[index] = text;
  //   setRates(newRate);
  // };

  // const onEndEditing = () => {
  //   let newRate = rates.map(function (str) {
  //     return parseFloat(str);
  //   });
  //   //total lucky rate
  //   let totalRate = 0;
  //   for (let i = 0; i < newRate.length; i++) {
  //     if (i % 2 === 0) {
  //       totalRate += parseFloat(newRate[i]);
  //     }
  //   }
  //   const unluckyRate = (100 - totalRate) / 4;
  //   newRate[1] = unluckyRate;
  //   newRate[3] = unluckyRate;
  //   newRate[5] = unluckyRate;
  //   newRate[7] = unluckyRate;
  //   setRates(newRate);
  // };

  const handleChangeImageSpin = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo', quality: 1});
    if (assets) {
      const uri = assets[0].uri;
      dispatch(changeImageRotation(uri));
    }
  };

  const handleChangeGift = async cellNumber => {
    const {assets} = await launchImageLibrary({mediaType: 'photo', quality: 1});
    if (assets) {
      const uri = assets[0].uri;
      let newGift = [...imageGift];
      if (cellNumber === 1) {
        newGift[1] = uri;
        newGift[3] = uri;
        newGift[5] = uri;
        newGift[7] = uri;
      }
      dispatch(changeImageCell(imageGift));
    }
  };

  const handleChangeBackground = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo', quality: 1});
    if (assets) {
      const uri = assets[0].uri;
      dispatch(changeImageBackground(uri));
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <Pressable
          style={{backgroundColor: colors.primary}}
          onPress={() => Keyboard.dismiss()}>
          <View style={{padding: 20, paddingTop: 0}}>
            {/* <Text style={[styles.textTitle, styles.mt20]}>
              Tỉ lệ phần thưởng
            </Text> */}

            {/* <View style={styles.roundView}>
              <Image
                source={require('../assets/image/round.png')}
                resizeMode="contain"
                style={styles.roundImage}
              />
              <Text style={[styles.roundTextRate1]}>
                {rates[0].toString().slice(0, 5)}%
              </Text>
              <Text style={[styles.roundTextRate2]}>
                {rates[1].toString().slice(0, 5)}%
              </Text>
              <Text style={[styles.roundTextRate3]}>
                {rates[2].toString().slice(0, 5)}%
              </Text>
              <Text style={[styles.roundTextRate4]}>
                {rates[3].toString().slice(0, 5)}%
              </Text>
              <Text style={[styles.roundTextRate5]}>
                {rates[4].toString().slice(0, 5)}%
              </Text>
              <Text style={[styles.roundTextRate6]}>
                {rates[5].toString().slice(0, 5)}%
              </Text>
              <Text style={[styles.roundTextRate7]}>
                {rates[6].toString().slice(0, 5)}%
              </Text>
              <Text style={[styles.roundTextRate8]}>
                {rates[7].toString().slice(0, 5)}%
              </Text>
            </View> */}
            {/* tabel */}
            {/* <DataTable>
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
                        onEndEditing={() => onEndEditing()}
                        value={rates[index].toString()}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable> */}
            {/* background */}
            <Text style={[globalStyle.textWhiteBold]}>
              Hình ảnh background của vòng quay
            </Text>
            <View style={[styles.gift, styles.mt20]}>
              {storeImageBackround ? (
                <Image
                  source={{uri: storeImageBackround}}
                  resizeMode="contain"
                  style={{
                    width: screen_width * 0.6,
                    height: screen_width * 0.6,
                  }}
                />
              ) : (
                <View style={styles.emptyView}>
                  <Text style={styles.textEmpty}>Trống</Text>
                </View>
              )}
            </View>
            <AppButton
              onPress={handleChangeBackground}
              label="Thay đổi"
              style={{marginVertical: 20, alignSelf: 'flex-start'}}
            />
            {/* img spin */}
            <Text style={[globalStyle.textWhiteBold, styles.mt20]}>
              Hình ảnh vòng quay
            </Text>
            <View style={[styles.gift, styles.mt20]}>
              {imageRoration ? (
                <Image
                  source={{uri: imageRoration}}
                  resizeMode="contain"
                  style={{
                    width: screen_width * 0.6,
                    height: screen_width * 0.6,
                  }}
                />
              ) : (
                <View style={styles.emptyView}>
                  <Text style={styles.textEmpty}>Trống</Text>
                </View>
              )}
            </View>
            <AppButton
              label="Thay đổi"
              style={{marginVertical: 20, alignSelf: 'flex-start'}}
              onPress={handleChangeImageSpin}
            />

            {/* image gift */}
            <Text style={[globalStyle.textWhiteBold, styles.mt20]}>
              Hình ảnh phần thưởng
            </Text>
            {/* cell 1 */}
            {imageGift.map((item, index) => {
              if (index % 2 !== 0) {
                return;
              }
              return (
                <View key={index}>
                  <Text style={globalStyle.textWhiteBold}>
                    Phần số {index + 1}
                  </Text>
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
                  <AppButton
                    label="Thay đổi"
                    onPress={() => handleChangeGift(index)}
                    style={{marginVertical: 20, alignSelf: 'flex-start'}}
                  />
                </View>
              );
            })}

            {/* unlucky gift */}
            <Text style={[globalStyle.textWhiteBold, styles.mt20]}>
              Hình ảnh chúc may mắn lần sau
            </Text>
            <View style={styles.giftWrapper}>
              {imageGift[1] ? (
                <Image
                  source={{uri: imageGift[1]}}
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
            <AppButton
              label="Thay đổi"
              onPress={() => handleChangeGift(1)}
              style={{marginVertical: 20, alignSelf: 'flex-start'}}
            />

            {/* submit */}
            {/* <Button
              style={{margin: 20}}
              onPress={onSubmitPress}
              mode="contained"
              buttonColor="#a5ce3a"
              textColor="black">
              Đồng ý
            </Button> */}
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  roundTextRate1: {
    color: 'black',
    position: 'absolute',
    right: '34%',
    top: '16%',
  },

  roundTextRate2: {
    color: 'black',
    position: 'absolute',
    right: '24%',
    top: '37%',
  },

  roundTextRate3: {
    color: 'black',
    position: 'absolute',
    right: '24%',
    bottom: '34%',
  },

  roundTextRate4: {
    color: 'black',
    position: 'absolute',
    right: '34%',
    bottom: '14%',
  },

  roundTextRate5: {
    color: 'black',
    position: 'absolute',
    left: '34%',
    bottom: '14%',
  },

  roundTextRate6: {
    left: '24%',
    bottom: '34%',
    color: 'black',
    position: 'absolute',
  },

  roundTextRate7: {
    color: 'black',
    position: 'absolute',
    left: '24%',
    top: '37%',
  },

  roundTextRate8: {
    color: 'black',
    position: 'absolute',
    left: '34%',
    top: '16%',
  },

  roundImage: {
    width: screen_width * 0.6,
    height: screen_width * 0.6,
    marginTop: 10,
  },
  roundView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTutorial: {
    width: screen_width * 0.6,
    height: screen_width * 0.6,
    marginTop: 10,
  },
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: 'lightgray',
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  gift: {
    width: screen_width * 0.6,
    height: screen_width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  mt20: {
    marginTop: 20,
  },
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
