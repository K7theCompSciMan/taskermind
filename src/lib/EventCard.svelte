<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Event } from '$lib/index';
	export let event: Event;
	let startDate: Date = event.startDate!;
	let endDate: Date = event.endDate!;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class=" border-black border border-opacity-100 shadow-2xl w-full h-[25%] bg-black pl-2 flex-col items-center opacity-75 rounded-2xl m-2 overflow-hidden hover:cursor-pointer" on:click={() => goto(`/event/${event.id}/details`)}>
	<h1 class="font-bold text-2xl text-blue-500  w-fit h-fit p-2 m-2 mb-8 relative">
		{event.name}
	</h1>
	<p class="text-lg text-slate-100 overflow-scroll w-1/2">{event.description}</p>
	<p class="text-lg text-slate-100">
		Start Date: {new Date(startDate).toLocaleDateString()} at {new Date(
			startDate
		).toLocaleTimeString()}
	</p>
	<p class="text-lg text-slate-100">End Date: {new Date(endDate).toLocaleDateString()} at {new Date(
        endDate
    ).toLocaleTimeString()}</p>
</div>
