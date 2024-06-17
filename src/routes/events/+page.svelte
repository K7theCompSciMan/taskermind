<script lang="ts">
	import Button from '$lib/Button.svelte';
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
	console.log($page.data.events)
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
<div class="flex absolute w-[75%] h-[75%] border pl-2 {dropdownDisplay} flex-col items-center ml-[12.5%] transition-opacity delay-100 bg-gray-500 rounded-2xl shadow-2xl">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-8 absolute right-0 cursor-pointer hover:text-red-500 transition"
		on:click={closeCreateEventDropdown}
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
	</svg>
	<h1 class="font-bold text-2xl text-cyan-500 w-fit h-fit p-2 m-2 mb-8 relative">
		Create a new Event!
	</h1>
	<form action="?/create" method="POST" class="border rounded-xl w-fit p-10 bg-teal-500">
		<div class="flex justify-center align-self-center">
			{#if form?.error}<p class=" text-red-700 font-bold">{form?.error}</p>{/if}
		</div>
		<div>
			<input
				type="text"
				name="name"
				required
				placeholder="Event Name"
				class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100"
			/>
		</div>
		<div>
			<input
				type="text"
				name="description"
				required
				placeholder="Event Description"
				class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100"
			/>
		</div>
		<div>
			<label for="startDate">Start Date: </label>
			<input
				type="datetime-local"
				name="startDate"
				required
				placeholder="Event Start Date and Time"
				class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100"
			/>
		</div>
		<div class="">
			<label for="endDate">End Date: </label>
			<input
				type="datetime-local"
				name="endDate"
				required
				placeholder="Event End Date and Time"
				class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100"
			/>
		</div>
		<div class="m-4 justify-center flex pb-6">
			<button
				type="submit"
				name="submit"
				class="bg-emerald-700 text-slate-100 p-2 rounded-3xl w-1/2">Create Event</button
			>
		</div>
	</form>
</div>
