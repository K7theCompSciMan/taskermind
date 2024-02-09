import { Task } from '../tasks/tasks.ts';

export interface User {
	id: number;
	username: string;
	email: string;
	password: string;
	tasks: Task[];
}
