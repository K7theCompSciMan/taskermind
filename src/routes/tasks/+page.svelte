<!-- import { CalendarView } from "fluent-svelte"; -->

<style>


.part:last-child {
    border-right: none;
}
.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  /* bottom: 23px;
  right: 28px;
  width: 280px; */
}
.cancel {
  width: 100%;
  padding: 16px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.8;

}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  bottom: 23px;
  right: 15px; 
  width: 200px;
  justify-content: center;
  justify-self: center;
  border: 3px solid #000000;
  z-index: 9;

}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Full-width input fields */
.form-container input[type=text], .form-container input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* When the inputs get focus, do something */
.form-container input[type=text]:focus, .form-container input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/login button */
.form-container .btn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
</style>
<button class="open-button" on:click={openForm}>Add Task</button>

<div class="form-popup" id="myForm">
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
	<button class="cancel" on:click={closeForm}>Close</button>

</div>
    
<script>
	function openForm() {
	  const form = document.getElementById("myForm");
	  if (form) form.style.display = "block";
	}
	
	function closeForm() {
	  const form = document.getElementById("myForm");
	  if (form) form.style.display = "none";
	}
</script>