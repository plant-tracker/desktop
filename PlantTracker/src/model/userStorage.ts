import { Plant } from './plant';
import { ReminderOnce, ReminderRepeat, Task, getTitle } from './task';

export interface UserStorage {
	email: string;
	plants: Plant[];
	tasks: Task[];
}

const p1: Plant = {
	name: 'Franek',
	type: 'fern',
	species: 'Monstera',
	location: 'living room',
	temperature: 'room',
	light: 'low',
	humidity: 'medium',
	photoUrl: 'https://cdn.shopify.com/s/files/1/0014/9068/1925/products/Plants_For_Humans_rosliny_doniczkowe_monsteradeliciosa-8_630x.jpg?v=1677857761',
	addedDate: new Date(2022, 3, 15),
};
const p2: Plant = {
	name: 'Darek',
	type: 'fern',
	species: 'Monstera',
	location: 'living room',
	temperature: 'room',
	light: 'low',
	humidity: 'low',
	photoUrl: 'https://kwiatydonice.pl/userdata/public/gfx/139833/Monstera-dziurawa-Monstera-deliciosa.jpg',
	addedDate: new Date(2022, 4, 10),
};
const p3: Plant = {
	name: 'Storczyk',
	type: 'seed plant',
	species: 'Storczyk',
	location: 'bedroom',
	temperature: 'cool',
	light: 'medium',
	humidity: 'low',
	photoUrl: 'https://cdn.shopify.com/s/files/1/2159/5885/products/image.jpg?v=1625688507',
	addedDate: new Date(2020, 3, 15),
};

const addedDate = new Date();

function inMinutes(minutes: number): ReminderOnce {
	const date = new Date(addedDate);
	date.setMinutes(addedDate.getMinutes() + minutes);
	return { type: 'once', date };
}

function reminder(days: number, inHours: number): ReminderRepeat {
	const atHour = (addedDate.getHours() + inHours) % 24;
	return { type: 'repeat', everyXDays: days, atHour, atMinute: 0 };
}

export const SAMPLE_USER_STORAGE: UserStorage = {
	email: 'user@plants.com',
	plants: [ p1, p2, p3 ],
	tasks: [
		{ plant: p1, type: 'water', addedDate, name: getTitle('water'), reminder: reminder(5, 1) },
		{ plant: p1, type: 'fertilize', addedDate, name: getTitle('fertilize'), reminder: inMinutes(500) },
		{ plant: p2, type: 'water', addedDate, name: getTitle('water'), reminder: reminder(8, 0) },
		{ plant: p2, type: 'spray', addedDate, name: getTitle('spray'), reminder: reminder(10, 15) },
		{ plant: p3, type: 'spray', addedDate, name: getTitle('spray'), reminder: reminder(1, 2) },
	],
};

console.log(inMinutes(10));
