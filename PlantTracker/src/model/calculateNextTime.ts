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
		if (reminderOccursInXDays > 1)
			return getForm('In % day', reminderOccursInXDays);

		milliseconds = 1000 * 60 * (task.reminder.atHour * 60 - now.getHours() * 60 + task.reminder.atMinute - now.getMinutes());
		if (milliseconds < 0) milliseconds += ONE_DAY_MS;
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

export function getPeriod(task: Task): string {
	if (task.reminder.type === 'once')
		return `On ${formatDate(task.reminder.date)}`;
	else
		return getForm('Every % day', task.reminder.everyXDays);
}

export function getHour(task: Task): string {
	if (task.reminder.type === 'once')
		return formatTime(task.reminder.date.getHours(), task.reminder.date.getMinutes());
	else
		return formatTime(task.reminder.atHour, task.reminder.atMinute);
}

export function formatDate(date: Date): string {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
  return `${day}.${('0' + month).slice(-2)}.${year}`;
}

export function formatTime(hour: number, minutes: number): string {
  return `${hour}:${('0' + minutes).slice(-2)}`;
}

function getForm(pattern: string, n: number): string {
	const s = n === 1 ? pattern : (pattern + 's');
	return s.replace('%', '' + n);
}
