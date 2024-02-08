import { Task } from '../tasks/tasks';

export interface User {
	username: string;
	email: string;
	password: string;
	tasks: Task[];
}
