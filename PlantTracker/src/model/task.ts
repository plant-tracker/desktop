import { Plant } from './plant';

export type TaskType = 'water' | 'fertilize' | 'spray' | 'prune';

export type ReminderOnce = {
	type: 'once';
	date: Date;
};
export type ReminderRepeat = {
	type: 'repeat';
	everyXDays: number;
	atHour: number;
	atMinute: number;
};
export type Reminder = ReminderOnce | ReminderRepeat;

export interface Task {
	plant: Plant;
	type: TaskType;
	name: string;
	reminder: Reminder;
	addedDate: Date;
}

export function getTitle(type: TaskType) {
	switch (type) {
		case 'fertilize': return 'Fertilize the soil';
		case 'prune': return 'Prune the plant';
		case 'spray': return 'Spray the leaves';
		case 'water': return 'Water the soil';
		default: throw new Error(`Invalid task type: ${type}`);
	}
}
