import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
        const formData = Object.fromEntries(await event.request.formData());
        const code = formData.code;
        const email = event.locals.user.email;
        let response = await fetch(`https://taskermind-api.fly.dev/user/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${event.locals.accessToken}`
            },
            body: JSON.stringify({ email, code })
        });
        if (response.status !== 200) {
            const error = await response.text();
            return fail(400, {
                error
            })
        }
        throw redirect(302, "/dashboard");
    }
};
