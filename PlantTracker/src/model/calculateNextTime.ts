import { Task } from './task';

export type RemainingPast = { type: 'past' };
export type RemainingDays = { type: 'days', days: number };
export type RemainingTime = { type: 'time', days: number, hours: number, minutes: number, seconds: number };
export type Remaining = RemainingPast | RemainingDays | RemainingTime;

export function getRemaining(task: Task): Remaining {
	const now = new Date();
	let milliseconds;
	if (task.reminder.type === 'once') {
		if (task.reminder.date < now)
			return { type: 'past' } as RemainingPast;
		milliseconds = task.reminder.date.valueOf() - now.valueOf();
	} else {
		// one day time in milliseconds
		const ONE_DAY_MS = 1000 * 60 * 60 * 24
		const daysPassedSinceReminderWasCreated = (now.valueOf() - task.created.valueOf()) / ONE_DAY_MS;
		const reminderOccursInXDays = daysPassedSinceReminderWasCreated % task.reminder.everyXDays;
		if (reminderOccursInXDays > 1)
			return { type: 'days', days: reminderOccursInXDays } as RemainingDays;

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

	return { type: 'time', days, hours, minutes, seconds } as RemainingTime;
}

export function getRemainingTime(task: Task): string {
	const remaining = getRemaining(task);
	switch (remaining.type) {

		case 'past':
			return 'Past';

		case 'days':
			return getForm('In % day', remaining.days);

		case 'time':
			if (remaining.days > 0)
				return getForm('In % day', remaining.days);
			if (remaining.hours > 0)
				return getForm('In % hour', remaining.hours);
			if (remaining.minutes > 0)
				return getForm('In % minute', remaining.minutes);
			return 'Right now';
	}
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
