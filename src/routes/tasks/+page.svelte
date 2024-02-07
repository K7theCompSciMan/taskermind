<script>
    let count = 0;

    function increment() {
        count += 1;
    }
    $: if(count >= 10) {
        alert("You clicked more than 10 times")
    }

    function resetPls() {
        count = 0;
        alert("Red]set")
    }
</script>


<button on:click={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
    
</button>
<button on:click={resetPls}>
    Reset
    
</button>

<style>
    button {
        background-color: rgb(49, 15, 145);
        color: #fff;
        padding: 2em;
        border: none;
        border-radius: 5em;
        cursor: pointer;
    }
</style>