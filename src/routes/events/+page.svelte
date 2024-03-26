<!-- <script>
	import Calendar from '$lib/Calendar.svelte';
	
	const today = new Date;
	
	let years = today.getFullYear();
</script>


<Calendar {today} year={years} /> -->

<script>

var types = ["Assigned", "Started", "Submit", "Completed"];
for (var i = 0; i<types.length; i++){
	let titles = document.createElement("div");
	titles.innerHTML = types[i];
	titles.classList.add("types");

}


</script>
<style>

</style>


<body>
	
	
</body>
