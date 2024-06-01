import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event) => {
    event.locals.user = null;
    event.locals.accessToken = "";
    event.cookies.set('refreshToken', '', {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 0 // 1 day
    });
    // throw redirect(302, '/login')
};