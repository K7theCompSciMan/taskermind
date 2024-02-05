<script lang="ts">
    import "../app.css"
    import { goto } from "$app/navigation";
    import Button from "$lib/Button.svelte";
    type Page = {
        name: string;
        path: string;}

    let pages: Page[] = [
        {name: "Home", path: "/"}
    ]
</script>

<nav class="justify-center items-center text-center">
    {#each pages as page}
        <Button name={page.name} onclick={() => goto(page.path)} />
    {/each}
</nav>
<slot />