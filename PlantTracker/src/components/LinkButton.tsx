import React from 'react';
import {
  Image,
  Pressable,
	StyleSheet,
  Text,
} from 'react-native';
import AppStyles from '../AppStyles';

type LinkButtonProps = {
	iconBlob: any,
  label: string,
  onClick: () => void,
};

export function LinkButton(props: LinkButtonProps): JSX.Element {
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,

      text: {
        ...AppStyles.text,
        fontWeight: '600' as any,
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
			<Image source={props.iconBlob} style={{height: 20}}/>
			{props.label && <Text style={styles.button.text}>{ props.label }</Text>}
		</Pressable>
	);
}
