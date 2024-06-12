// See https://kit.svelte.dev/docs/types#app

import type { SessionUser, Event, Task } from "$lib";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			accessToken: string;
			user: SessionUser;
		}
		// interface PageData {
		// 	events: Event[];
		// 	user: SessionUser;
		// 	tasks: Task[];
		// }
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
