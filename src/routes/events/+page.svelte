<script lang="ts">

	import Button from '$lib/Button.svelte';
	import CreateEventPopup from '$lib/CreateEventPopup.svelte';
	import { page } from '$app/stores';
	import type { Event } from '$lib/index';
	import type { ActionData } from './$types';
	let events: Event[] = [];
	$: events = $page.data.events;
	let createEventDropdown = false;
	const closeCreateEventDropdown = () => {
		createEventDropdown = false;
	};
	const openCreateEventDropdown = () => {
		createEventDropdown = true;
	};
	$: notdropdowndisplay = createEventDropdown ? 'opacity-0' : 'opacity-100';
	$: dropdownDisplay = createEventDropdown ? 'opacity-100' : 'opacity-0';
	if (!events) {
		events = [];
		openCreateEventDropdown();
	}
	export let form: ActionData;
</script>

<Button name="Create Event" onclick={openCreateEventDropdown} size="w-40 {notdropdowndisplay}" />
<div class="{notdropdowndisplay} flex flex-col md:flex-row border absolute left-[12.5%] w-fit h-fit">
	{#each events as event}
		<div class="border w-[75%] h-[75%] pl-2 flex-col items-center ml-[12.5%]">
			<h1 class="font-bold text-2xl text-blue-500 border w-fit h-fit p-2 m-2 mb-8 relative">
				{event.name}
			</h1>
			<p class="text-lg text-slate-100">{event.description}</p>
			<p class="text-lg text-slate-100">Start Date: {event.startDate}</p>
			<p class="text-lg text-slate-100">End Date: {event.endDate}</p>
		</div>
	{/each}
</div>
<!-- svelte-ignore missing-declaration -->
<CreateEventPopup form={form} bind:dropdownDisplay={dropdownDisplay} closeCreateEventDropdown={closeCreateEventDropdown} />