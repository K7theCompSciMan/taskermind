import type { PageServerLoad, Actions } from '../login/$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = (event) => {
	const user = event.locals.user;
	if (user) {
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		console.log("form submitted")
		if (!formData.email || !formData.password || !formData.username || !formData.confirmPassword) {
			console.log("Missing form data")
			return fail(400, {
				error: 'Missing formData'
			});
		}

		const { email, username, password, confirmPassword } = formData as {
			email: string;
			username: string;
			password: string;
			confirmPassword: string;
		};
		if (password === confirmPassword) {
			console.log("passwords match")
			const response = await fetch('https://taskermind-api.fly.dev/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, email, password })
			});
			if (response.status !== 201) {
				let error = await response.text();
				return fail(401, {
					error
				});
			}
			console.log("sent request - passed")
			const data = await response.json();
			const { user, accessToken, refreshToken } = data;
			console.log(data)
			event.locals.user = user;
			console.log(event.locals.user);
			event.locals.accessToken = accessToken;
			console.log(event.locals.accessToken);

			// Set the cookie
			event.cookies.set('refreshToken', refreshToken, {
				httpOnly: true,
				path: '/',
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 1 day
			});

			throw redirect(302, '/verify');
		} else {
			return fail(400, {
				notmatching: true
			});
		}
	}
};
