<!-- <script>
	import +layout from './../+layout.svelte';
	import Calendar from '$lib/Calendar.svelte';
	
	const today = new Date;
	
	let years = today.getFullYear();
</script>


<Calendar {today} year={years} /> -->

<script lang="ts">

let types: string[] = [];

types = ["Assigned", "Started", "Submit", "Completed"];



</script>
<style>
.types{
	font-size: 20px;
	margin: 10px;
	border: 2px solid black;
	border-radius: 1rem;
	padding: 10px;
}
.types-wrapper{
	display: flex;
	align-items: center;
	justify-content: center;
	
	}
</style>

<div class="types-wrapper">
{#each types as type}
	<h1 class="types">{type}</h1>
{/each}
</div>