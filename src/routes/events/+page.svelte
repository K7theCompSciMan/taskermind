<script>
	import Calendar from '$lib/Calendar.svelte';
	
	const today = new Date;
</script>

<style>

	Calendar{
		border: solid 1px black;
	}
</style>
<Calendar {today} year={2020} />