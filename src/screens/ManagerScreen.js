import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ScreenName, colors, globalStyle} from '../constants';
import {AppButton} from '../component';
import images from '../assets/image';

const ManagerScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={[globalStyle.flex_1]}>
        <Image
          source={images.tutorial}
          resizeMode="contain"
          style={styles.imageTutorial}
          tintColor={'white'}
        />
      </View>
      <View>
        <Text style={globalStyle.textWhiteBold}>Mô tả vòng quay</Text>
        <Text style={globalStyle.textWhite}>
          Các phần được đánh số thứ tự theo chiều kim đồng hồ
        </Text>
        <Text style={globalStyle.textWhite}>Phần có quà: 1,3,5,7</Text>
        <Text style={globalStyle.textWhite}>Phần không có quà: 2,4,6,8</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.ImageSettingScreen)}
        style={globalStyle.button}>
        <Text style={[globalStyle.textButton]}>Hình ảnh trò chơi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.RateScreen)}
        style={globalStyle.button}>
        <Text style={[globalStyle.textButton]}>Tỉ lệ</Text>
      </TouchableOpacity>
      <AppButton
        label="Điểm bán hiện tại"
        onPress={() => navigation.navigate(ScreenName.LocationScreen)}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.StorageScreen)}
        style={globalStyle.button}>
        <Text style={[globalStyle.textButton]}>Lưu trữ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManagerScreen;

const styles = StyleSheet.create({
  imageTutorial: {
    marginTop: 10,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    gap: 16,
    padding: 16,
    alignItems: 'center',
  },
});
