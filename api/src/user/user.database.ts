import { User } from './user.interface.ts';
import fs from 'fs';
import bcrypt from 'bcryptjs';
let users: User[] = loadUsers();

function loadUsers() {
	try {
		let data = fs.readFileSync('./users.json', 'utf8');
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
		return [];
	}
}

function saveUsers() {
	try {
		fs.writeFileSync('./users.json', JSON.stringify(users), 'utf-8');
		console.log('Users saved successfully');
	} catch (error) {
		console.log(error);
	}
}

export const getUsers = async (): Promise<User[]> => {
	return Object.values(users);
};
export const getUser = async (id: number): Promise<User> => {
	return users[id];
};
export const createUser = async (userData: User): Promise<User | null> => {
	const hashedPassword = await bcrypt.hash(userData.password, 10);

	const user: User = {
		id: userData.id,
		username: userData.username,
		email: userData.email,
		password: hashedPassword,
		tasks: []
	};

	users.push(user);

	saveUsers();

	return user;
};

export const updateUser = async (id: number, userData: User): Promise<User | null> => {
	const user = users[id];

	if (user) {
		user.username = userData.username;
		user.email = userData.email;
		user.password = await bcrypt.hash(userData.password, 10);

		saveUsers();
	}

	return user;
};

export const deleteUser = async (id: number): Promise<User | null> => {
	const user = users[id];

	if (user) {
		users = users.filter((u) => u.id !== id);
		saveUsers();
	}

	return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	const user = users.find((u) => u.email === email);

    if (!user){
        return null;
    }
    return user;
};

export const checkPassword = async (email: string, password: string): Promise<boolean> => {
    const user = await getUserByEmail(email);

    if (user) {
        return bcrypt.compare(password, user.password);
    }

    return false;
};
