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
