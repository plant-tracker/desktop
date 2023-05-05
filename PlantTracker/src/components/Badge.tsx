import { Image, StyleSheet, Text, View } from 'react-native';
import AppStyles from '../AppStyles';

export type BadgeProps = {
	iconBlob: any;
  label: string,
};

export function Badge(props: BadgeProps): JSX.Element {
	return (
		<View style={styles.badge}>
			<Image source={props.iconBlob}/>
			<Text style={styles.text}>{ props.label }</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		height: 24,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 0,
		paddingHorizontal: 10,
		backgroundColor: '#ADDDDA',
		borderRadius: 12,
		gap: 6,
	},
	text: {
		...AppStyles.text,
		fontSize: 11,
	}
});
