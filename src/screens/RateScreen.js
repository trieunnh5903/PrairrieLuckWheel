import {
  Alert,
  FlatList,
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
import {globalStyle, screen_width} from '../constants';
import {changeRates} from '../redux/appSlice';
import {useAppDispatch, useAppSelector} from '../redux/store';

const RateScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const currRates = useAppSelector(state => state.rates);
  const [rates, setRates] = useState(currRates);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        let totalRate = 0;
        for (let i = 0; i < rates.length; i++) {
          if (i % 2 === 0) {
            totalRate += rates[i];
          }
        }
        if (totalRate > 50) {
          Alert.alert('Thông báo', 'Tổng tỉ lệ phần quà không quá 50%');
          e.preventDefault();
        } else {
          dispatch(changeRates(rates));
          navigation.dispatch(e.data.action);
        }
      }),
    [dispatch, navigation, rates],
  );

  console.log(rates);

  const onChangeText = (text, index) => {
    let newRate = [...rates];
    newRate[index] = text;
    setRates(newRate);
  };

  const onEndEditing = () => {
    let newRate = rates.map(function (str) {
      return parseFloat(str) || 0;
    });
    //total lucky rate
    let totalRate = 0;
    for (let i = 0; i < newRate.length; i++) {
      if (i % 2 === 0) {
        totalRate += parseFloat(newRate[i]);
      }
    }
    const unluckyRate = (100 - totalRate) / 4;
    newRate[1] = unluckyRate;
    newRate[3] = unluckyRate;
    newRate[5] = unluckyRate;
    newRate[7] = unluckyRate;
    setRates(newRate);
  };
  const renderItem = ({item, index}) => {
    if (index % 2 !== 0) {
      return;
    }
    return (
      <View key={item} style={styles.row}>
        <Text style={styles.column}>{index + 1}</Text>
        <View style={styles.column}>
          <TextInput
            style={{
              color: 'white',
            }}
            textAlign="center"
            keyboardType="numeric"
            onChangeText={value => onChangeText(value, index)}
            onEndEditing={() => onEndEditing()}
            value={item.toString()}
          />
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={[styles.row, {marginTop: 20}]}>
        <Text style={[styles.column, globalStyle.textWhiteBold]}>Phần</Text>
        <Text style={[styles.column, globalStyle.textWhiteBold]}>
          Tỉ lệ (%)
        </Text>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={globalStyle.container} behavior="padding">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={globalStyle.container}>
          <View style={styles.roundView}>
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
          </View>
          {renderHeader()}
          {rates.map((item, index) => renderItem({item, index}))}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RateScreen;

const styles = StyleSheet.create({
  roundTextRate1: {
    color: 'white',
    position: 'absolute',
    right: '34%',
    top: '16%',
  },

  roundTextRate2: {
    color: 'white',
    position: 'absolute',
    right: '24%',
    top: '37%',
  },

  roundTextRate3: {
    color: 'white',
    position: 'absolute',
    right: '24%',
    bottom: '34%',
  },

  roundTextRate4: {
    color: 'white',
    position: 'absolute',
    right: '34%',
    bottom: '14%',
  },

  roundTextRate5: {
    color: 'white',
    position: 'absolute',
    left: '34%',
    bottom: '14%',
  },

  roundTextRate6: {
    left: '24%',
    bottom: '34%',
    color: 'white',
    position: 'absolute',
  },

  roundTextRate7: {
    color: 'white',
    position: 'absolute',
    left: '24%',
    top: '37%',
  },

  roundTextRate8: {
    color: 'white',
    position: 'absolute',
    left: '34%',
    top: '16%',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingVertical: 6,
  },

  roundView: {
    flex: 1,
  },

  roundImage: {
    width: screen_width * 0.6,
    height: screen_width * 0.6,
    marginTop: 10,
    alignSelf: 'center',
    tintColor: 'white',
  },
});
