import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {
  changeGifts,
  changeImageBackground,
  changeImageRotation,
} from '../redux/appSlice';
import {colors, globalStyle, screen_width} from '../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {AppButton, AppTextInput} from '../component';

const AdminScreen = () => {
  const dispatch = useAppDispatch();
  const imageRoration = useAppSelector(state => state.imageRotation);
  const gifts = useAppSelector(state => state.gifts);
  const storeImageBackround = useAppSelector(state => state.imageBackground);

  const handleChangeImageSpin = async () => {
    try {
      const {assets} = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (assets) {
        const uri = assets[0].uri;
        dispatch(changeImageRotation(uri));
      }
    } catch (error) {}
  };

  const handleChangeGift = async index => {
    try {
      const {assets} = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (assets) {
        const uri = assets[0].uri;
        let newGifts = [...gifts];
        const gift = {name: newGifts[index]?.name || '', uri};
        if (index === 1) {
          newGifts[1] = gift;
          newGifts[3] = gift;
          newGifts[5] = gift;
          newGifts[7] = gift;
        } else {
          newGifts[index] = gift;
        }
        dispatch(changeGifts(newGifts));
      }
    } catch (error) {}
  };

  const handleChangeBackground = async () => {
    try {
      const {assets} = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (assets) {
        const uri = assets[0].uri;
        dispatch(changeImageBackground(uri));
      }
    } catch (error) {}
  };

  const onChangeNameGift = (index, text) => {
    let newGifts = [...gifts];
    const gift = {uri: newGifts[index]?.uri || '', name: text};
    newGifts[index] = gift;
    dispatch(changeGifts(newGifts));
  };

  console.log('gifts', gifts);
  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <Pressable
          style={{backgroundColor: colors.primary}}
          onPress={() => Keyboard.dismiss()}>
          <View style={{padding: 20, paddingTop: 0}}>
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
              label="Chọn ảnh"
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
              label="Chọn ảnh"
              style={{marginVertical: 20, alignSelf: 'flex-start'}}
              onPress={handleChangeImageSpin}
            />

            {/* image gift */}
            <Text style={[globalStyle.textWhiteBold, styles.mt20]}>
              Hình ảnh phần thưởng
            </Text>
            {gifts.map((item, index) => {
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
                        source={{uri: item.uri}}
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
                    label="Chọn ảnh"
                    onPress={() => handleChangeGift(index)}
                    style={{marginVertical: 20, alignSelf: 'flex-start'}}
                  />

                  <AppTextInput
                    placeholder="Tên phần quà bằng chữ"
                    style={{marginBottom: 16}}
                    value={gifts[index]?.name}
                    onChangeText={text => onChangeNameGift(index, text)}
                  />
                </View>
              );
            })}

            {/* unlucky gift */}
            <Text style={[globalStyle.textWhiteBold, styles.mt20]}>
              Hình ảnh chúc may mắn lần sau
            </Text>
            <View style={styles.giftWrapper}>
              {gifts[1] ? (
                <Image
                  source={{uri: gifts[1].uri}}
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
              label="Chọn ảnh"
              onPress={() => handleChangeGift(1)}
              style={{marginVertical: 20, alignSelf: 'flex-start'}}
            />
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
