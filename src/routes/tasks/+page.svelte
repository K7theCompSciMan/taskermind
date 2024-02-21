<!-- import { CalendarView } from "fluent-svelte"; -->

<style>


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
    
</div>
</div>
