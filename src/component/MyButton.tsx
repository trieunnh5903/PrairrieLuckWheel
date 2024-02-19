import {GestureResponderEvent, ViewStyle} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

interface MyButtonProps {
  onPress?: ((e: GestureResponderEvent) => void) | undefined;
  style?: ViewStyle;
  label: string;
}
const MyButton: React.FC<MyButtonProps> = ({onPress, label, style}) => {
  return (
    <Button
      onPress={onPress}
      style={[{marginVertical: 20, alignSelf: 'flex-start'}, style]}
      mode="contained"
      buttonColor="#a5ce3a"
      textColor="black">
      {label}
    </Button>
  );
};

export default MyButton;
