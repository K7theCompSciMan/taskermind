<!-- <script>
	import Calendar from '$lib/Calendar.svelte';
	
	const today = new Date;
	
	let years = today.getFullYear();
</script>


<Calendar {today} year={years} /> -->

<script>

window.onload = function() {
    setPage();
}

function setPage(){
	var types = ["Assigned", "Started", "Submit", "Completed"];

	for (var i = 0; i<types.length; i++){
		let titles = document.createElement("div");
		titles.id = i.toString(); // Convert the id to a string to fix the type error
		titles.innerHTML = types[i];
		titles.classList.add("types");
		document.body.appendChild(titles); // Append the created div to the body to display it
	}
}


</script>
<style>

</style>


<body>
	<h1 id="1"> <!-- Corrected the id assignment -->
		Events
	</h1>
	
</body>
