<script lang="ts">
	import { page } from '$app/stores';
	import type { Event } from '$lib';
	let event: Event;
	$: event = $page.data.eventDetails;
	// $: console.log(event);
</script>
<div
	class=" flex flex-col md:flex-row absolute rounded-2xl left-[10%] w-[80%] h-[80%] bg-blue-500 pl-2 pr-2 no-scrollbar mt-12"
>
{event.name}
</div>