import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import * as ScopedStorage from 'react-native-scoped-storage';
import {storage} from '../utils';
import {globalStyle, storageKey} from '../constants';
import {AppButton} from '../component';

const StorageScreen = () => {
  const [hasUri, setHasUri] = React.useState(false);
  useEffect(() => {
    const getPersistedUriPermissions = async () => {
      const persistedUris = await ScopedStorage.getPersistedUriPermissions();
      if (persistedUris.length > 0) {
        setHasUri(true);
      }
    };
    getPersistedUriPermissions();
    return () => {};
  }, []);

  const requestStoragePermission = async () => {
    try {
      const dir = await ScopedStorage.openDocumentTree(true);
      if (!dir) {
        // User cancelled
        return;
      }
      storage.setObjData(storageKey.userDataDirectory, dir);
      setHasUri(true);
    } catch (err) {
      console.log('requestStoragePermission', err);
    }
  };

  return (
    <View style={[globalStyle.container, globalStyle.gap_16]}>
      <Text
        style={[globalStyle.textWhiteBold, {color: hasUri ? 'white' : 'red'}]}>
        <Text style={globalStyle.textWhite}>Trạng thái:</Text> {'\t '}
        {hasUri ? 'Đã chọn thư mục' : 'Chưa chọn thư mục'}
      </Text>
      <AppButton onPress={requestStoragePermission} label="Chọn nơi lưu trữ" />
      {/* <AppButton onPress={onOpenDirPress} label="Mở thư mục lưu trữ" /> */}
    </View>
  );
};

export default StorageScreen;

const styles = StyleSheet.create({});
