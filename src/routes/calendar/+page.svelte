<script lang="ts">
	import { page } from '$app/stores';
	import type { SessionUser } from '$lib';
	import Calendar from '$lib/Calendar.svelte';
	
	const today = new Date;
	
	let years = today.getFullYear();
	// export let user: SessionUser;
	
 </script>

{#if $page.data.user}
	<h1> welcome {$page.data.user.username}</h1>
{:else}
	<h1> welcome guest</h1>
{/if}


<Calendar {today} year={years} />
