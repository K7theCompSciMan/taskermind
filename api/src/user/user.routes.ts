import express, { Request, Response } from 'express';
import { User } from './user.interface.ts';
import { StatusCodes } from 'http-status-codes';
import * as db from './user.database.ts';

export const userRouter = express.Router();

userRouter.get('/users', async (req: Request, res: Response) => {
	try {
		const users = await db.getUsers();
		if (!users) {
			res.status(StatusCodes.NOT_FOUND).send('No users found');
		}
		return res.status(StatusCodes.OK).json(users);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
});

userRouter.get('/user/:id', async (req: Request, res: Response) => {
	try {
		const user = await db.getUserById(parseInt(req.params.id));
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).send('User not found');
		}
		return res.status(StatusCodes.OK).json(user);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
});

userRouter.post('/register', async (req: Request, res: Response) => {
	try {
		const { id, username, email, password } = req.body;
		if (!id || !username || !email || !password) {
			return res.status(StatusCodes.BAD_REQUEST).send('Invalid input');
		}
		const user = await db.getUserByEmail(email);
		if (user) {
			return res.status(StatusCodes.BAD_REQUEST).send('User with the same email already exists');
		}

		const newUser = await db.createUser(req.body);

		return res.status(StatusCodes.CREATED).json(newUser);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
});

userRouter.post('/login', async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(StatusCodes.BAD_REQUEST).send('Invalid input');
		}

		const user = await db.getUserByEmail(email);

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).send('User not found');
		}

		const isPasswordValid = await db.checkPassword(user.id, password);

		if (!isPasswordValid) {
			return res.status(StatusCodes.UNAUTHORIZED).send('Invalid password');
		}

		return res.status(StatusCodes.OK).json(user);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
});

userRouter.put('/user/:id', async (req: Request, res: Response) => {
	try {
		const { id, username, email, password } = req.body;
		const user = await db.getUserById(id);

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).send('User not found, check all parameters');
		}

		const updateUser = await db.updateUser(id, req.body);

		return res.status(StatusCodes.OK).json(updateUser);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
});

userRouter.delete('/user/:id', async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);

		const user = await db.getUserById(id);
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).send('User not found');
		}

		await db.deleteUser(id);

		return res.status(StatusCodes.OK).send('User deleted');
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
	}
});
