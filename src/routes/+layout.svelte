<script lang="ts">
    import "../app.css"
    import { goto } from "$app/navigation";
    import Button from "$lib/Button.svelte";
    type Page = {
        name: string;
        path: string;}

    let pages: Page[] = [
        {name: "Home", path: "/"},
        {name: "About", path: "/about"}
    ]
</script>   

<div class="">
    <nav class="justify-center items-center text-center bg-persian-red h-32 align-middle p-2 shadow-lg">
        {#each pages as page}
                <Button name={page.name} onclick={() => goto(page.path)} />
        {/each}
        <h1 class="justify-center text-2xl p-1 bg-orange-500 w-fit ">TaskerMind</h1>
    </nav>
    <slot />
</div>