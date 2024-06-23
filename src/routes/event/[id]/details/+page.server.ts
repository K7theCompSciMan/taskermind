import type {PageServerLoad} from './$types';
export const load: PageServerLoad = async (event) => {
    // console.log("Fetching " +  `https://taskermind-api.fly.dev/event/${event.params.id}`)
    let res = await fetch(`https://taskermind-api.fly.dev/event/${event.params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${event.locals.accessToken}`
        }
    });
    let data;
    try {
        // console.log(res);
        data = await res.json();
    } catch (err){
        console.log(err);
        return {
            error: err
        }
    }
    const eventDetails = data;
    return {
        eventDetails
    };
}