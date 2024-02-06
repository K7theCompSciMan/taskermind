<script lang="ts">
	import Heading from './../lib/Heading.svelte';
    import "../app.css"
    import { goto } from "$app/navigation";
    import Button from "$lib/Button.svelte";
    type Page = {
        name: string;
        path: string;}

    let pages: Page[] = [
        {name: "Home", path: "/"}
    ]
    let dropdown = false;
</script>   

<div class="">
    <nav class="flex justify-center items-center text-center bg-persian-red h-full align-middle p-2 shadow-lg">
        <Heading/>
        {#each pages as page}
                <Button name={page.name} onclick={() => goto(page.path)} hover={() => {}}/>
        {/each}
    </nav>
    <slot />
</div>