<script>
	import Calendar from '$lib/Calendar.svelte';
	
	const today = new Date;
</script>

<Calendar {today} year={2020} />