import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenName, colors, globalStyle} from '../constants';
import {AppButton} from '../component';
import images from '../assets/image';

const ManagerScreen = ({navigation}) => {
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const showModal = () => setModalImageVisible(true);
  const hideModal = () => setModalImageVisible(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalImageVisible}
        onRequestClose={hideModal}>
        <View style={styles.centeredView}>
          <Pressable onPress={hideModal} style={styles.modalOverlay} />
          <View style={styles.modalView}>
            <Text style={[globalStyle.textBlack, {textAlign: 'center'}]}>
              Chọn hình ảnh cần sửa
            </Text>

            <View style={{gap: 16}}>
              <Pressable
                onPress={() => {
                  navigation.navigate(ScreenName.StandByImage);
                  hideModal();
                }}>
                <Text style={{color: 'black'}}>Màn hình Stand By</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  navigation.navigate(ScreenName.ImageSettingScreen);
                  hideModal();
                }}>
                <Text style={{color: 'black'}}>Màn hình Game</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
      <TouchableOpacity onPress={showModal} style={globalStyle.button}>
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
      <AppButton
        label="Đổi mật khẩu"
        onPress={() => navigation.navigate(ScreenName.ChangePassword)}
      />
    </View>
  );
};

export default ManagerScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    gap: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 16,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
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
