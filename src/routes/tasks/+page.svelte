

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
  position: absolute;
  right: 100px;
  size: 20px;
  border-radius: 1rem;
  
}
.cancel {
  width: 100%;
  padding: 16px 20px;
  background-color: #f44336;
  color: white;
  border: black 2px solid;
  cursor: pointer;
  opacity: 0.8;

}
.submit {
  width: 100%;
  padding: 16px 20px;
  background-color: #04AA6D;
  color: rgb(3, 255, 3);
  border: black 2px solid;
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
  background-color:rgb(59, 130, 246);
  z-index: 9;
  border-radius: 2px;
  box-shadow: 5px 5px 5px 5px lightblue;


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

.showtasks {
  display: flex;
  justify-self: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 352px;
  background-color: rgb(59, 130, 246);
  border-radius: 1rem;
  margin: 1rem;
  box-shadow: 5px 5px 5px 5px lightblue;
  padding-top: 0.5rem/* 8px */;

}
input [type=text]{
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: 2px solid black;
  background: #f1f1f1;
  border-radius: 1rem;


}


  

</style>
<button class="open-button" on:click={openForm}>Add Task</button>
<div class="form-popup" id="myForm">
	<h1> Task Information</h1>
	<br>
	<form>
		<label for="nameTask">Task Name:</label><br>
		<input type="text" id="nameTask" name="nameTask" bind:value={name}><br>
		<label for="Due Date">Due Date</label><br>
		<input type = "date" id = "dueDate" name = "dueDate"bind:value={dueDate}><br>
		<label for="description">Description:</label><br>
		<input type="text" id="description" name="description"bind:value={des}><br>
		<label for="priority">Priority:</label><br>
		<input type="text" id="priority" name="priority"bind:value={priority}><br>
		



	
	</form>
  <button class="btn" type="submit" on:click={() => onclick()} on:click={closeForm}>Add Task</button>
	<button class="cancel" on:click={closeForm}>Close</button>

</div>
<Card>
	<h1>Events</h1>
	<div>
		<h2>Event 1</h2>
		<p>Due Date: 12/12/2021</p>
		<p>Description: This is a task</p>
		<p>Priority: High</p>
	</div>
</Card>
    
<script lang="ts">
  let name:string;
  let dueDate: string;
  let des: string;
  let priority: string;
  let completed: boolean;
  let open:boolean;
  open = false;
	function openForm() {
    if(open){
      open = false;
      closeForm();
    }
    else{
      const form = document.getElementById("myForm");
      if (form) form.style.display = "block";
      open =true;
    }
	
	}
	
	function closeForm() {
	  const form = document.getElementById("myForm");
	  if (form) form.style.display = "none";
    open = false;
	}



	import Card from '$lib/Card.svelte';

  
  import Button from '$lib/Button.svelte';
  const onclick = async () => {
    completed = false;
      const response = await fetch('https://taskermind-api.fly.dev/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name,
              dueDate,
              des,
              priority,
              completed
          })
      });
      const data = await response.json();
      
      console.log(data);

  }


</script>