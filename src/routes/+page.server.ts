import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    if(event.locals.user) {
        throw redirect(300, "/dashboard");
    }
}