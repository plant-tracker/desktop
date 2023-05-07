import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, initializeFirestore, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { UserStorage } from './userStorage';
import { Plant } from './plant';
import { firebaseConfig } from '../../firebase-config';
import { Task } from './task';
import { PlantDb, convertFromDb, convertToDb } from './model-db';

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
	console.log('FIRESTORE INIT');
	app = initializeApp(firebaseConfig);
	initializeFirestore(app, { experimentalForceLongPolling: true });
} else {
	console.log('FIRESTORE NO INIT');
	app = getApp();
}

export interface AuthorizeOk { type: 'ok'; uid: string; }
export interface AuthorizeError { type: 'error'; error: string; }
export type AuthorizeResult = AuthorizeOk | AuthorizeError;

export async function authorize(email: string, password: string): Promise<AuthorizeResult> {
	const auth = getAuth(app);
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return { type: 'ok', uid: userCredential.user.uid };
	} catch (error) {
		console.log((<any>error).code);
		switch ((<any>error).code) {
			case 'auth/user-not-found':
				try {
					console.log('User does not exist, creating user');
					const userCredential2 = await createUserWithEmailAndPassword(auth, email, password);
					return { type: 'ok', uid: userCredential2.user.uid };
				} catch (error2) {
					console.log((<any>error2).code);
				}
				break;
			case 'auth/wrong-password':
				return { type: 'error', error: 'Invalid email and/or password' };
		}

		return { type: 'error', error: 'An error occurred' };
	}
}

export async function logout(): Promise<void> {
	const auth = getAuth(app);
	try {
		await signOut(auth);
	} catch (error) {
		console.error(error);
	}
}

export async function downloadUserData(): Promise<UserStorage> {
	let plants: Plant[] = [];
	let tasks: Task[] = [];
	try {
		const data = await repository.getPlantsAndTasks();
		plants = data.plants;
		tasks = data.tasks;
	} catch (error) {
		console.log('ERROR');
		console.log((<any>error).message);
		console.error(error);
	}

	return {
		email: getAuth(app).currentUser!.email,
		plants: plants,
		tasks: tasks,
	} as UserStorage;
}

export const repository = {

	uid: () => getAuth(app).currentUser!.uid,
	db: () => getFirestore(app),

	getPlantsAndTasks: async (): Promise<{plants: Plant[], tasks: Task[]}> => {
		const res = await getDocs(collection(repository.db(), 'users', repository.uid(), 'plants'));

		const plantsDb = res.docs.map(doc => ({
			id: doc.id, // add ID
			...doc.data(),
			created: doc.data().created.toDate(), // convert timestamp to Date
			tasks: doc.data().tasks?.map((task: any) => ({
				...task,
				created: task.created.toDate(),
			})) || [],
		} as PlantDb));

		return convertFromDb(plantsDb);
	},

	addPlant: async (plant: Plant): Promise<void> => {
		const plantDb = convertToDb(plant, []);
		console.log('addPlant', plantDb);
		const res = await addDoc(collection(repository.db(), 'users', repository.uid(), 'plants'), plantDb);
		plant.id = res.id;
	},

	updatePlant: async (plant: Plant, allTasks: Task[]): Promise<void> => {
		const plantDb = convertToDb(plant, allTasks);
		console.log('updatePlant', plantDb);
		await setDoc(doc(repository.db(), 'users', repository.uid(), 'plants', plantDb.id!), plantDb);
	},

	deletePlant: async (plant: Plant): Promise<void> => {
		console.log('deletePlant', plant);
		await deleteDoc(doc(repository.db(), 'users', repository.uid(), 'plants', plant.id!));
	},

};
