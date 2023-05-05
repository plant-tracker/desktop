import { FlexAlignType, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { Task, TaskType } from '../model/task';
import AppStyles from '../AppStyles';
import { Badge } from './Badge';
import { getRemainingTime } from '../model/calculateNextTime';

export type CardPlantWaterProps = {
	task: Task;
};

export function CardPlantWater(props: CardPlantWaterProps): JSX.Element {
	const task = props.task;
	const plant = task.plant;
	const title = getTitle(task.type);

	return (
		<Pressable onPress={() => console.log('TODO')}>
			<Card>
				<View style={styles.card}>
					<View style={styles.photo}>
						<Image style={styles.photo} source={{uri: plant.photoUrl}}></Image>
					</View>
					<View style={styles.center}>
						<Text style={styles.header}>{title}</Text>
						<View style={[styles.row, styles.row.rowMiddle]}>
							<Text style={styles.plantName}>{plant.name}</Text>
							<Text style={styles.plantSpecies}>{plant.species}</Text>
						</View>
						<View style={[styles.row, styles.row.rowEnd]}>
							<Badge iconBlob={require('../assets/icon-task-water.svg')} label={getRemainingTime(task)} />
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
	},
	right: {
		padding: 10,
		justifyContent: 'center',
	},
	header: {
		...AppStyles.text,
		fontSize: 16,
		fontWeight: '700',
	},
	row: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		rowMiddle: {
			flex: 1,
			alignItems: 'flex-start' as FlexAlignType,
		},
		rowEnd: {
			justifyContent: 'flex-end' as any,
		},
	},
	plantName: {
		...AppStyles.text,
		fontSize: 14,
		fontWeight: '600',
	},
	plantSpecies: {
		...AppStyles.text,
		fontSize: 12,
		fontWeight: '300',
		fontStyle: 'italic',
	},
});

function getTitle(type: TaskType) {
	switch (type) {
		case 'fertilize': return 'Fertilize the soil';
		case 'prune': return 'Prune the plant';
		case 'spray': return 'Spray the leaves';
		case 'water': return 'Water the soil';
		default: throw new Error(`Invalid task type: ${type}`);
	}
}
