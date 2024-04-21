import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalStyle, screen_width} from '../constants';
import {AppButton} from '../component';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {launchImageLibrary} from 'react-native-image-picker';
import {changeStanByBackground} from '../redux/appSlice';

const StandByImage = () => {
  const dispatch = useAppDispatch();
  const standByBackground = useAppSelector(state => state.standByBackground);
  const handleChangeBackground = async () => {
    try {
      const {assets} = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (assets) {
        const uri = assets[0].uri;
        dispatch(changeStanByBackground(uri));
      }
    } catch (error) {}
  };
  return (
    <View style={globalStyle.container}>
      <Text style={[globalStyle.textWhiteBold]}>
        Hình ảnh background của vòng quay
      </Text>
      <View style={[styles.gift, styles.mt20]}>
        {standByBackground ? (
          <Image
            source={{uri: standByBackground}}
            resizeMode="contain"
            style={{
              width: screen_width * 0.6,
              height: screen_width * 0.6,
            }}
          />
        ) : (
          <View style={styles.emptyView}>
            <Image
              source={require('../assets/image/z5176770054393_b848428422d9132de84ee41669ed09d7.jpg')}
              resizeMode="contain"
              style={{
                width: screen_width * 0.6,
                height: screen_width * 0.6,
              }}
            />
          </View>
        )}
      </View>
      <AppButton
        onPress={handleChangeBackground}
        label="Chọn ảnh"
        style={{marginVertical: 20, alignSelf: 'flex-start'}}
      />
    </View>
  );
};

export default StandByImage;

const styles = StyleSheet.create({});
