import { FlexAlignType, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { Task } from '../model/task';
import AppStyles from '../AppStyles';
import { Badge } from './Badge';
import { getRemainingTime } from '../model/calculateNextTime';
import { useContext } from 'react';
import { AppContext, Page } from '../model/AppContext';

export type CardPlantWaterProps = {
	task: Task;
};

export function CardPlantWater(props: CardPlantWaterProps): JSX.Element {
	const task = props.task;
	const plant = task.plant;

  const { setPageWithPlant } = useContext(AppContext)!;

	return (
		<Pressable onPress={() => setPageWithPlant(Page.ViewPlant, plant)}>
			<Card>
				<View style={styles.card}>
					<View style={styles.photo}>
						{ plant.photoUrl && <Image style={styles.photo} source={{uri: plant.photoUrl}}></Image> }
					</View>
					<View style={styles.center}>
						<Text style={styles.header}>{task.name}</Text>
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
