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
  const currRates = useAppSelector(state => state.app.rates);
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
    for (let i = 0; i < rates.length; i++) {
      if (isNaN(rates[i])) {
        setErrorMess('Hãy nhập giá trị số');
        return false;
      }
    }

    if (rates.reduce((curr, next) => curr + next, 0) === 0) {
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
                Ô số
              </DataTable.Title>
              <DataTable.Title
                numeric
                textStyle={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                Tỉ lệ (%)
              </DataTable.Title>
            </DataTable.Header>

            {rates.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  {index + 1}
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
            ))}
          </DataTable>
          <Button
            style={{margin: 20}}
            onPress={onSubmitPress}
            mode="contained"
            buttonColor="lightgreen"
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
