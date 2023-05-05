import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { TaskType } from '../model/task';
import AppStyles from '../AppStyles';
import { Plant } from '../model/plant';

export type CardPlantProps = {
	plant: Plant;
};

export function CardPlant(props: CardPlantProps): JSX.Element {
	const plant = props.plant;

	return (
		<Pressable onPress={() => console.log('TODO')}>
			<Card>
				<View style={styles.card}>
					<View style={styles.photo}>
						<Image style={styles.photo} source={{uri: plant.photoUrl}}></Image>
					</View>
					<View style={styles.center}>
						<Text style={styles.header}>{plant.name}</Text>
						<Text style={styles.plantSpecies}>{plant.species}</Text>

						<View style={styles.iconText}>
							<Image source={require('../assets/icon-location.svg')} />
							<Text style={styles.text}>{plant.location}</Text>
						</View>

						<View style={styles.row}>
							<View style={styles.iconText}>
								<Image source={require('../assets/icon-temp.svg')} />
								<Text style={styles.text}>{plant.temperature}</Text>
							</View>
							<View style={styles.iconText}>
								<Image source={require('../assets/icon-sun.svg')} />
								<Text style={styles.text}>{plant.light}</Text>
							</View>
							<View style={styles.iconText}>
								<Image source={require('../assets/icon-water.svg')} />
								<Text style={styles.text}>{plant.humidity}</Text>
							</View>
						</View>
					</View>

					<View style={styles.right}>
						<Image source={require('../assets/icon-arrow-right.png')}/>
					</View>
				</View>
			</Card>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'row',
	},
	photo: {
		width: 125,
		height: 125,
		borderRadius: 10,
		resizeMode: 'cover',
	},
	center: {
		flex: 1,
		padding: 10,
		gap: 8,
	},
	right: {
		padding: 10,
		justifyContent: 'center',
	},
	header: {
		...AppStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	row: {
		flexDirection: 'row',
		gap: 10,
	},
	plantSpecies: {
		...AppStyles.text,
		fontSize: 14,
		fontWeight: '300',
		fontStyle: 'italic',
	},
	text: {
		...AppStyles.text,
		fontSize: 12,
	},
	iconText: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
});
