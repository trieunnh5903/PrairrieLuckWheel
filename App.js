import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import MainNavigator from './src/navigator/MainNavigator';
import {CustomerKey, storageKey} from './src/constants';
import {storage} from './src/utils';
import * as ScopedStorage from 'react-native-scoped-storage';

const App = () => {
  useEffect(() => {
    const cleanHistory = async () => {
      try {
        // clear data async storage
        const currentDate = new Date();
        const userHistory =
          (await storage.getObject(storageKey.customerList)) || [];
        const filteredHistory = userHistory.filter(item => {
          const itemDate = new Date(item[CustomerKey.NGAY]);
          return (
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        });
        await storage.setObjData(storageKey.customerList, filteredHistory);
        // clear excel
        const dirName = 'Prairie Lucky Wheel';
        const dir = await storage.getObject(storageKey.userDataDirectory);
        if (!dir) {
          return;
        }
        const listFile = await ScopedStorage.listFiles(dir.uri);
        const existedDir = listFile.find(i => i.name === dirName);
        if (existedDir) {
          await ScopedStorage.deleteFile(existedDir.uri);
        }
      } catch (error) {
        console.log('cleanHistory', error);
      }
    };
    cleanHistory();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
