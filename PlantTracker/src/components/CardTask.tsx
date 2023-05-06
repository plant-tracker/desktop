import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { Task, TaskType } from '../model/task';
import { Plant } from '../model/plant';
import AppStyles from '../AppStyles';
import { AppContext, Page } from '../model/AppContext';
import { useContext } from 'react';
import { Badge } from './Badge';
import { getHour, getPeriod, getRemainingTime } from '../model/calculateNextTime';

export type CardTaskProps = {
	plant: Plant,
	task: Task;
};

export function CardTask(props: CardTaskProps): JSX.Element {
	const task = props.task;

  const { setPageWithPlant } = useContext(AppContext)!;

	return (
		<Card>
			<View style={styles.card}>

				<View style={styles.left}>

					<View style={styles.row}>
						<Image style={styles.headerIcon} source={require('../assets/icon-task-water.svg')} />
						<Text style={styles.header}>{task.name}</Text>
					</View>

					<View style={styles.row}>
						<Badge iconBlob={require('../assets/icon-time-clock.svg')} label={getPeriod(task)} />
						<Badge iconBlob={require('../assets/icon-time-hourglass.svg')} label={getHour(task)} />
						<Badge iconBlob={require('../assets/icon-time-play.svg')} label={getRemainingTime(task)} />
					</View>

				</View>

				<View style={styles.right}>
					<Pressable onPress={() => console.log('TODO')}>
						<Image source={require('../assets/icon-pen-edit.svg')}/>
					</Pressable>
				</View>

			</View>
		</Card>

	);
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'row',
	},
	left: {
		flex: 1,
		paddingTop: 10,
		paddingHorizontal: 10,
		gap: 8,
	},

	photo: {
		width: 125,
		height: 125,
		borderRadius: 10,
		resizeMode: 'cover',
	},
	right: {
		padding: 10,
		justifyContent: 'center',
	},
	headerIcon: {
		width: 30,
		height: 30,
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
});
