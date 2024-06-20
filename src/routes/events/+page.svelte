<script lang="ts">
	import EventCard from '$lib/EventCard.svelte';

	import Button from '$lib/Button.svelte';
	import { page } from '$app/stores';
	import CreateEventPopup from '$lib/CreateEventPopup.svelte';
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
	$: notdropdowndisplay = createEventDropdown ? 'hidden' : 'opacity-100';
	$: dropdownDisplay = createEventDropdown ? 'opacity-100' : 'hidden';
	if (!events) {
		events = [];
		openCreateEventDropdown();
	}
	export let form: ActionData;
</script>

<Button
	name="Create Event"
	onclick={openCreateEventDropdown}
	size="w-40 {notdropdowndisplay} left-[80%]"
/>
<br />
<br />
<div
	class="{notdropdowndisplay} flex flex-col md:flex-row absolute rounded-2xl left-[10%] w-[80%] h-[80%] bg-blue-500 pl-2 pr-2 no-scrollbar"
>
	{#if events.length === 0}
		<h1 class="text-2xl text-blue-500">No Events Found</h1>
	{/if}
	{#each events as event}
		<EventCard {event} />
	{/each}
</div>
<!-- svelte-ignore missing-declaration -->
<CreateEventPopup {form} bind:dropdownDisplay {closeCreateEventDropdown} />
