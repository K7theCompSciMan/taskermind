<script>

</script>

<style>

.center-box {
    display: flex; /* Use flexbox for layout */
    justify-content: center; /* Center the content horizontally */
    align-items: center; /* Center the content vertically */
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
    <div class="part">Part 1</div>
    <div class="part">Part 2</div>
</div>
</div>
