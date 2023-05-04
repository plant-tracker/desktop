import { Task } from './task';

export function getRemainingTime(task: Task): string {
	const now = new Date();
	let milliseconds;
	if (task.reminder.type === 'once') {
		if (task.reminder.date < now)
			return 'Past';
		milliseconds = task.reminder.date.valueOf() - now.valueOf();
	} else {
		// one day time in milliseconds
		const ONE_DAY_MS = 1000 * 60 * 60 * 24
		const daysPassedSinceReminderWasCreated = (now.valueOf() - task.addedDate.valueOf()) / ONE_DAY_MS;
		const reminderOccursInXDays = daysPassedSinceReminderWasCreated % task.reminder.everyXDays;
		if (reminderOccursInXDays > 0)
			return getForm('In % day', reminderOccursInXDays);

		// task.reminder is at 14:30
		// if it's earlier, i.e. hour < 14 or (hour == 14 and minutes <= 30), then show minutes or hours left
		if (now.getHours() < task.reminder.atHour || (now.getHours() === task.reminder.atHour && now.getMinutes() <= task.reminder.atMinute))
			milliseconds = 1000 * 60 * (task.reminder.atHour * 60 - now.getHours() * 60 + task.reminder.atMinute - now.getMinutes());
		else
			// otherwise, one day
			return 'In 1 day';
	}

	let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

	if (days > 0)
		return getForm('In % day', days);
	if (hours > 0)
		return getForm('In % hour', hours);
	if (minutes > 0)
		return getForm('In % minute', minutes);
	return 'Right now';
}

function getForm(pattern: string, n: number): string {
	const s = n === 1 ? pattern : (pattern + 's');
	return s.replace('%', '' + n);
}
