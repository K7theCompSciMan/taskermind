import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/login');
	} else {
		let res = await fetch(`https://taskermind-api.fly.dev/events/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                authorization: `Bearer ${event.locals.accessToken}`
			},
			body: JSON.stringify({ userId: event.locals.user.id })
		});
        let data;
        try {
		data = await res.json();
        } catch (err){
            console.log(err);
            return {
                error: err
            }
        }
        const events = data;
		return {
			events
		};
	}
};
export const actions: Actions = {
	create: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		const { name, description, startDate, endDate } = formData as {
			name: string;
			description: string;
			startDate: string;
			endDate: string;
		};
		const newEvent = {
			name,
			description,
			startDate,
			endDate,
			completed: false
		};
		console.log(newEvent);
		const response = await fetch('https://taskermind-api.fly.dev/event/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${event.locals.accessToken}`
			},
			body: JSON.stringify({ ...newEvent, assignedUser: event.locals.user?.id })
		});
		console.log(response);
		if (response.status !== 200) {
			let error = await response.text();
			console.log('Failed to create event', error);
			return {
				error
			};
		}
		throw redirect(302, '/events');
	}
};
