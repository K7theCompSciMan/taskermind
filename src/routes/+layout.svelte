<script lang="ts">
	import Heading from '$lib/Heading.svelte';
    import "../app.css"
    import { goto } from "$app/navigation";
    import Button from "$lib/Button.svelte";
    import src from '$lib/images/logo.jpeg'

    type Page = {
        name: string;
        path: string;
        onHover: () => void;
        leave: () => void;
    }
    let aboutDropdown = false;
    let tasksDropdown = false;
    let eventsDropdown = false;
    let timelineDropdown = false;
    
    let pages: Page[] = [
        {name: "Home", path: "/", onHover: () => {}, leave: () => {}},
        {name: "About", path: "/about", onHover: () => aboutDropdown = true, leave: () => aboutDropdown = false},
        {name: "Tasks", path: "/tasks", onHover: () => tasksDropdown = true, leave: () => tasksDropdown = false},
        {name: "Events", path: "/events", onHover: () => eventsDropdown = true, leave: () => eventsDropdown = false},
        {name: "Timeline", path: "/timeline", onHover: () => timelineDropdown = true, leave: () => timelineDropdown = false},
        {name: "Login", path: "/login", onHover: () => {}, leave: () => {}},
    ]
</script>    
<div class="bg-green-500 h-screen w-full overflow-hidden">
    <nav class="flex justify-center items-center text-center bg-persian-red align-middle p-2 shadow-2xl rounded-2xl m-4 w-fit h-fit">
        <Heading logo={true} {src} />
        {#each pages as page}
        <Button name={page.name} onclick={() => goto(page.path)} hover={page.onHover} leave={page.leave}/>
            {/each}
    </nav>
    <!-- {#if aboutDropdown}
    <div></div>
    {:else if tasksDropdown}
    <div></div>
    
    {:else if eventsDropdown}
    <div></div>
    
    {:else if timelineDropdown}
    <div></div>
    {:else} -->
        <slot/>
    <!-- {/if} -->
</div>