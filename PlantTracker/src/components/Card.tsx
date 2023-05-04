import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export function Card(props: { children: ReactNode }): JSX.Element {
	return (
		<View style={styles.card}>
			{props.children}
		</View>
	);
}

export function EmptyCard(): JSX.Element {
	return <View style={styles.cardDimensions}></View>;
}

const styles = StyleSheet.create({
	cardDimensions: {
		margin: 10,
		width: 360,
	},
	card: {
		margin: 10,
		width: 360,
		height: 125,
		backgroundColor: 'white',
		borderRadius: 10,
	},
});
