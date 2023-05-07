import { Plant } from './plant';
import { Reminder, Task, TaskType } from './task';

export interface PlantDb {
	id?: string;
	name: string;
	type: 'fern' | 'seed plant' | 'tree' | 'other';
	species_name: string;
	location: string;
	photo_url: string;
	temperature: 'cool' | 'medium' | 'warm';
	light_levels: 'low' | 'medium' | 'high';
	humidity: 'low' | 'medium' | 'high';
	created: Date;
	tasks: TaskDb[];
}

export interface TaskDb {
	type: TaskType;
	name: string;
	reminder: Reminder;
	created: Date;
}

// in application, tasks and plants are stored separately
// in database, tasks are parts of plants
// these functions convert data between these two types

export function convertFromDb(plantsDb: PlantDb[]): { plants: Plant[], tasks: Task[] } {
	const plants = plantsDb.map(plantDb => ({
		id: plantDb.id,
		name: plantDb.name,
		type: plantDb.type,
		species: plantDb.species_name,
		location: plantDb.location,
		photoUrl: plantDb.photo_url,
		temperature: plantDb.temperature,
		light: plantDb.light_levels,
		humidity: plantDb.humidity,
		created: plantDb.created,
	} as Plant));

	const findPlantForTask = (taskDb: TaskDb): Plant => {
		const plantDb = plantsDb.find(plantDb => plantDb.tasks.includes(taskDb))!;
		return plants.find(plant => plant.id === plantDb.id)!;
	}

	const tasksDb = plantsDb.map(plantDb => plantDb.tasks).flat();
	const tasks = tasksDb.map(taskDb => ({
		type: taskDb.type,
		name: taskDb.name,
		reminder: taskDb.reminder,
		created: taskDb.created,
		plant: findPlantForTask(taskDb),
	} as Task));

	return { plants, tasks };
}

export function convertToDb(plant: Plant, allTasks: Task[]): PlantDb {
	const plantDb = {
		id: plant.id,
		name: plant.name,
		type: plant.type,
		species_name: plant.species,
		location: plant.location,
		photo_url: plant.photoUrl,
		temperature: plant.temperature,
		light_levels: plant.light,
		humidity: plant.humidity,
		created: plant.created,
		tasks: [],
	} as PlantDb;

	const plantTasks = allTasks.filter(task => task.plant === plant);
	const plantTasksDb = plantTasks.map(task => ({
		type: task.type,
		name: task.name,
		reminder: task.reminder,
		created: task.created,
	} as TaskDb));
	plantDb.tasks = plantTasksDb;

	return plantDb;
}
