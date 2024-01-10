import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
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
      const unluckyRate =
        (100 - rates.reduce((pre, curr) => pre + curr, 0)) / 4;
      console.log(unluckyRate);
      let updateRates = [...rates];
      updateRates[1] = unluckyRate;
      updateRates[3] = unluckyRate;
      updateRates[5] = unluckyRate;
      updateRates[7] = unluckyRate;
      // console.log(updateRates);
      dispatch(changeRates(rates));
      navigation.navigate('Wheel');
    }
  };

  const validate = () => {
    for (let i = 0; i < rates.length; i++) {
      if (isNaN(rates[i])) {
        setErrorMess('Hãy nhập giá trị số');
        return false;
      }
    }

    const totalRate = rates.reduce((curr, next) => curr + next, 0);
    if (totalRate === 0 || totalRate > 100) {
      setErrorMess('Tỉ lệ không đúng');
      return false;
    }

    setErrorMess('');
    return true;
  };

  const onChangeText = (text: string, index: number) => {
    let newRate = [...rates];
    newRate[index] = Number(text);
    setRates(newRate);
  };

  console.log(rates);

  return (
    <KeyboardAvoidingView onResponderStart={() => console.log('start')}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={{padding: 20}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title
                textStyle={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                Ô
              </DataTable.Title>
              <DataTable.Title
                numeric
                textStyle={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                Tỉ lệ (%)
              </DataTable.Title>
            </DataTable.Header>

            {rates.map((item, index) => {
              if (index === 0) {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                      Bánh cá 1
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

              if (index === 2) {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                      Bánh quy
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

              if (index === 4) {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                      Bánh cá 2
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

              if (index === 6) {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                      Ốc quế
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
          <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold'}}>
            {errorMess}
          </Text>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default AdminScreen;
