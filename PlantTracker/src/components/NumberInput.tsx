import React from 'react';
import {
  TextInput, ViewStyle,
} from 'react-native';

type NumberInputProps = {
	value: string,
  onChangeText: (text: string) => void,
  maxValue: number;
  style?: ViewStyle,
};

export function NumberInput(props: NumberInputProps): JSX.Element {
  const [error, setError] = React.useState(false);

  const styleError = { borderColor: 'red' };

  const maxLength = ('' + props.maxValue).length;

  const textChanged = (text: string) => {
    setError(text.length === 0 || !/^\d+$/.test(text) || parseInt(text) < 0 || parseInt(text) > props.maxValue);
    props.onChangeText(text);
  };

  return (
    <TextInput style={[props.style, error && styleError]} onChangeText={text => textChanged(text)}
      value={props.value} inputMode='numeric' keyboardType='numeric' maxLength={maxLength} />
	);
}
