import React from 'react';
import {
  Image,
  Pressable,
	StyleSheet,
  Text,
} from 'react-native';
import AppStyles from '../AppStyles';

type IconButtonProps = {
	iconBlob: any,
  label?: string,
  onClick: () => void,
};

export function IconButton(props: IconButtonProps): JSX.Element {
  const [hovered, setHovered] = React.useState(false);

  const getStyles = (pressed: boolean) => [
    styles.button,
    hovered && styleHovered,
    pressed && stylePressed,
  ];

  const stylePressed = { opacity: 0.5 };

  const styleHovered = { opacity: 0.7 };

  const styles = StyleSheet.create({
    button: {
      width: 80,
      height: 70,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,

      text: {
        ...AppStyles.text,
        fontSize: 16,
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
			<Image source={props.iconBlob}/>
			{props.label && <Text style={styles.button.text}>{ props.label }</Text>}
		</Pressable>
	);
}
