import { NativeModules } from 'react-native';
import { Task } from './model/task';
import { getRemaining } from './model/calculateNextTime';

export class Notifications {

	private timer?: number;
	private tasks?: Task[];

	start() {
		// once a minute
		this.cancel();
		this.timer = setInterval(() => this.checkTasks(), 60000);
	}

	set(tasks: Task[]) {
		this.tasks = tasks;
	}

	checkTasks(): void {
		if (!this.tasks || this.tasks.length === 0) {
			console.log('Skipped checking tasks');
			return;
		}

		console.log('Checking tasks');
		const messages = [];
		for (const task of this.tasks) {
			const remaining = getRemaining(task);
			console.log('Task', task, remaining);
			if (remaining.type === 'time' && remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0)
				messages.push(`${task.plant.name} - ${task.name}`);
		}

		console.log('Ended checking tasks', messages);

		if (messages.length > 0) {
			if (messages.length > 3) {
				// only 3 lines can be displayed
				messages[2] += ', AND MORE...'
			}
			const message = messages.join('\n');
			NativeModules.Notifications.raise(message);
		}
	}

	cancel() {
		if (this.timer)
			clearInterval(this.timer);
		this.timer = undefined;
	}

}
