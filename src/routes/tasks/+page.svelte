

<script context = "module">

    export async function load( { fetch}) {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const guides = await res.JSON()

        if (res.ok){
            return {
                props: {
                    guides
                }
            }
        }

        return {
            status: res.status,
            error: new Error('Failed to fetch guides')
        }
    }
</script>

<script>
    export let guides
</script>

<dive class = "guides">

    <ul>
        {#each guides as guide}
        <li>
            <a href = "/">{guide.title}</a>
        </li>
        {/each}
    </ul>
</dive>