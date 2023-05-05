import React from 'react';
import {
  Image,
  Pressable,
	StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import AppStyles from '../AppStyles';

type AppButtonProps = {
  backgroundColor: string,
  hoverBackgroundColor?: string,
  textColor: string,
	iconBlob?: any,
  label: string,
  narrow?: boolean,
  buttonStyle?: ViewStyle,
  textStyle?: TextStyle,
  onClick: () => void,
};

export function AppButton(props: AppButtonProps): JSX.Element {
  const [hovered, setHovered] = React.useState(false);

  const getStyles = (pressed: boolean) => [
    styles.button,
    props.buttonStyle,
    { backgroundColor: props.backgroundColor },
    hovered && styleHovered,
    pressed && stylePressed,
  ];

  const stylePressed = { opacity: 0.7 };

  const styleHovered = props.hoverBackgroundColor
    ? { backgroundColor: props.hoverBackgroundColor }
    : { opacity: 0.8 };

  const styles = StyleSheet.create({
    button: {
      padding: 15,
      borderRadius: 10,
      margin: 10,
      width: props.narrow ? 'auto' : 500,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,

      text: {
        ...AppStyles.text,
        fontSize: 20,
      }
    },
  });

  return (
		<Pressable
      style={({pressed}) => getStyles(pressed)}
      onHoverIn={_ => setHovered(true)}
      onHoverOut={_ => setHovered(false)}
      onPress={props.onClick}
    >
      {props.iconBlob && <Image source={props.iconBlob}/>}
			<Text style={[styles.button.text, props.textStyle, { color: props.textColor }]}>
        { props.label }
      </Text>
		</Pressable>
	);
}
