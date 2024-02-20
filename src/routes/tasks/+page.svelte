<!-- import { CalendarView } from "fluent-svelte"; -->

<script>
    
    const date = new Date();
	
	const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	}
	
	const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let monthIndex = date.getMonth();
	// const currentMonth = date.toLocaleString('en-US', { month: 'long' })
	$: month = monthNames[monthIndex];
	
	let year = date.getFullYear();
	
	$: firstDayIndex = new Date(year, monthIndex, 1).getDay();
	// const currentDay = date.getDate();
	$: numberOfDays = new Date(year, monthIndex+1, 0).getDate();
	
	$: calendarCellsQty = numberOfDays + firstDayIndex;
	
	const goToNextMonth = () => {
		if (monthIndex >= 11) {
			year += 1;
			return monthIndex = 0;
		}
		return monthIndex += 1;
	}
	
	const goToPrevMonth = () => {
		if (monthIndex <= 0) {
			year -= 1;
			return monthIndex = 11;
		}
		return monthIndex -= 1;
	}
	
	$: console.log(`${month}, ${today.dayNumber}, ${year}, FIRST DAY index is ${firstDayIndex}, MONTH index is ${monthIndex}, No. of days: ${numberOfDays}`)
</script>

<style>

ul {list-style-type: none;}

	/* Month header */
	.month {
		padding: 70px 25px;
		width: auto;
		background: #1abc9c;
		text-align: center;
	}

	/* Month list */
	.month ul {
		margin: 0;
		padding: 0;
	}

	.month ul li {
		color: white;
		font-size: 20px;
		text-transform: uppercase;
		letter-spacing: 3px;
	}

	/* Previous button inside month header */
	.month .prev {
		float: left;
		padding-top: 10px;
		cursor: pointer;
	}

	/* Next button */
	.month .next {
		float: right;
		padding-top: 10px;
		cursor: pointer;
	}

	/* Weekdays (Mon-Sun) */
	.weekdays {
		margin: 0;
		padding: 10px 0;
		background-color:#ddd;
	}

	.weekdays li {
		display: inline-block;
		width: 13.6%;
		color: #666;
		text-align: center;
	}

	/* Days (1-31) */
	.days {
		padding: 10px 0;
		background: #eee;
		margin: 0;
	}

	.days li {
		list-style-type: none;
		display: inline-block;
		border: 1px solid black;
		padding: 9px;
		width: 11.6%;
		text-align: center;
		margin-bottom: 1px;
		font-size: 1.2rem;
		color: #777;
		cursor: pointer;
	}

	/* Highlight the "current" day */
	.active {
		padding: 5px;
		background: #2bffd5;
		color: white !important
	}


.center-box {
    display: flex; /* Use flexbox for layout */
    justify-content: center; /* Center the content horizontally */
    height: 100vh; /* Take up full viewport height */
}


.content {
    display: flex; /* Use flexbox for the inner container as well */
    border: 2px solid black; /* Add a border for visibility */
    padding: 20px; /* Add some padding around the content */
}


.part {
    flex: 1; /* Make each part take up equal space */
    text-align: center; /* Center the text inside each part */
    padding: 10px; /* Add padding inside each part */
    border-right: 1px solid black; /* Add a divider between the two parts */
}


.part:last-child {
    border-right: none;
}
</style>

<div class="center-box">
<div class="content">
    <div class="part">
        <h1> Task Information</h1>
        <br>
        <form>
            <label for="nameTask">Task Name:</label><br>
            <input type="text" id="nameTask" name="nameTask"><br>
            <label for="Due Date">Due Date</label><br>
            <input type = "date" id = "dueDate" name = "dueDate"><br>
            <label for="description">Description:</label><br>
            <input type="text" id="description" name="description"><br>
            <label for="priority">Priority:</label><br>
            <input type="text" id="priority" name="priority"><br>
            



            <br>
            <input type = "submit" value = "Submit">
        </form>

    </div>
    <div class="part">
        <div class="month">
		<ul>
			<li class="prev" on:click={goToPrevMonth}>&#10094;</li>
			<li class="next" on:click={goToNextMonth}>&#10095;</li>
			<li>{month}<br>
				<span style="font-size:18px">{year}</span>
			</li>
		</ul>
	</div>

	<ul class="weekdays">
		<li>Su</li>
		<li>Mo</li>
		<li>Tu</li>
		<li>We</li>
		<li>Th</li>
		<li>Fr</li>
		<li>Sa</li>
	</ul>

	<ul class="days">
		{#each Array(calendarCellsQty) as _, i}
			{#if i < firstDayIndex || i >= numberOfDays+firstDayIndex  }
				<li>&nbsp;</li>
			{:else}
				<li class:active={i === today.dayNumber+(firstDayIndex-1) &&
													monthIndex === today.month &&
													year === today.year}>
					{(i - firstDayIndex) + 1}
				</li>
			{/if}
		{/each}
	</ul>    
        
    </div>
</div>
</div>
