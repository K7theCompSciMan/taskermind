import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// const { headers } = event.request;
	// const cookies = parse(headers.get('cookie') ?? '');
	const cookies = event.cookies;
	if (cookies.get('refreshToken')) {
		// Remove Bearer prefix
		const refreshToken = cookies.get('refreshToken');
		const response = await fetch('http://localhost:7000/session/refresh', {
			method: 'GET',
			headers: {
				'x-refresh': refreshToken
			}
		});
		const accessToken = (await response.json()).accessToken;
		event.locals.accessToken = accessToken;
		const res = await fetch('http://localhost:7000/session/user', {
			headers: {
				authorization: `Bearer ${accessToken}`
			}
		});
		const user = (await res.json()).user;
		if (res.status === 200) {
			event.locals.user = user;
		}
	}
	return await resolve(event);
};
