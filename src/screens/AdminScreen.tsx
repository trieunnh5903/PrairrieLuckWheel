import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button, DataTable, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../type/navigation.type';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {changeRates} from '../redux/appSlice';

const AdminScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [errorMess, setErrorMess] = useState('');
  const currRates = useAppSelector(state => state.rates);
  const [rates, setRates] = useState(currRates);
  const dispatch = useAppDispatch();

  const onSubmitPress = () => {
    const isValid = validate();
    if (isValid) {
      dispatch(changeRates(rates));
      navigation.navigate('Wheel');
    }
  };

  const validate = () => {
    // CHECK NUMBER
    for (let i = 0; i < rates.length; i++) {
      if (isNaN(rates[i])) {
        setErrorMess('Hãy nhập giá trị số');
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
      return false;
    }

    setErrorMess('');
    return true;
  };

  const onChangeText = (text: string, index: number) => {
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

  return (
    <KeyboardAvoidingView onResponderStart={() => console.log('start')}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={{padding: 20}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.textTitle}>Ô</DataTable.Title>
              <DataTable.Title numeric textStyle={styles.textTitle}>
                Tỉ lệ (%)
              </DataTable.Title>
            </DataTable.Header>

            {rates.map((item, index) => {
              if (index === 0) {
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
                      Bánh cá kem sầu riêng
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
              }

              if (index === 1) {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell
                      style={{
                        flex: 4,
                      }}
                      textStyle={[styles.textBody, {color: 'gray'}]}>
                      Chúc may mắn lần sau
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TextInput
                        editable={false}
                        style={{color: 'gray'}}
                        keyboardType="number-pad"
                        onChangeText={value => onChangeText(value, index)}
                        defaultValue={rates[index].toString()}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }

              if (index === 2) {
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
                      Bánh đồng xu
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TextInput
                        style={{color: 'black'}}
                        keyboardType="number-pad"
                        onChangeText={value => onChangeText(value, index)}
                        defaultValue={rates[index].toString()}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }

              if (index === 3) {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell
                      style={{
                        flex: 4,
                      }}
                      textStyle={[styles.textBody, {color: 'gray'}]}>
                      Chúc may mắn lần sau
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TextInput
                        editable={false}
                        style={{color: 'gray'}}
                        keyboardType="number-pad"
                        onChangeText={value => onChangeText(value, index)}
                        defaultValue={rates[index].toString()}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }

              if (index === 4) {
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
                      textStyle={{color: 'black', fontSize: 16}}>
                      Bánh cá kem nhãn
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TextInput
                        style={{color: 'black'}}
                        keyboardType="number-pad"
                        onChangeText={value => onChangeText(value, index)}
                        defaultValue={rates[index].toString()}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }

              if (index === 5) {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell
                      style={{
                        flex: 4,
                      }}
                      textStyle={[styles.textBody, {color: 'gray'}]}>
                      Chúc may mắn lần sau
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TextInput
                        editable={false}
                        style={{color: 'gray'}}
                        keyboardType="number-pad"
                        onChangeText={value => onChangeText(value, index)}
                        defaultValue={rates[index].toString()}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }

              if (index === 6) {
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
                      textStyle={{color: 'black', fontSize: 16}}>
                      Phomai que
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TextInput
                        style={{color: 'black'}}
                        keyboardType="number-pad"
                        onChangeText={value => onChangeText(value, index)}
                        defaultValue={rates[index].toString()}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }

              if (index === 7) {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell
                      style={{
                        flex: 4,
                      }}
                      textStyle={[styles.textBody, {color: 'gray'}]}>
                      Chúc may mắn lần sau
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <TextInput
                        editable={false}
                        style={{color: 'gray'}}
                        keyboardType="number-pad"
                        onChangeText={value => onChangeText(value, index)}
                        defaultValue={rates[index].toString()}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }
            })}
          </DataTable>
          <Button
            style={{margin: 20}}
            onPress={onSubmitPress}
            mode="contained"
            buttonColor="#a5ce3a"
            textColor="black">
            Thay đổi
          </Button>
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {errorMess}
          </Text>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
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
