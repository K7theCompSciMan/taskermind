<script lang="ts">
	import Heading from '$lib/Heading.svelte';
    import "../app.css"
    import { goto } from "$app/navigation";
    import Button from "$lib/Button.svelte";
    import src from '$lib/images/logo.jpeg'
    import peep from '$lib/images/download.png'
	import { page } from '$app/stores';

    type Page = {
        name: string;
        path: string;
        onHover: () => void;
        leave: () => void;
    }
    let aboutDropdown = false;
    let tasksDropdown = false;
    let calendarDropdown = false;
    let timelineDropdown = false;
    
    let pages: Page[] = [
        {name: "About", path: "/about", onHover: () => aboutDropdown = true, leave: () => aboutDropdown = false},
        {name: "Tasks", path: "/tasks", onHover: () => tasksDropdown = true, leave: () => tasksDropdown = false},
        {name: "Events", path: "/events", onHover: () => tasksDropdown = true, leave: () => tasksDropdown = false},
        {name: "Calendar", path: "/calendar", onHover: () => calendarDropdown = true, leave: () => calendarDropdown = false},
        {name: "Login", path: "/login", onHover: () => {}, leave: () => {}},
        {name: "Sign Up", path: "/register", onHover: () => {}, leave: () => {}},
    ]
    let loggedInPages: Page[] = [
        {name: "Tasks", path: "/tasks", onHover: () => tasksDropdown = true, leave: () => tasksDropdown = false},
        {name: "Events", path: "/events", onHover: () => tasksDropdown = true, leave: () => tasksDropdown = false},
        {name: "Calendar", path: "/calendar", onHover: () => calendarDropdown = true, leave: () => calendarDropdown = false},
        {name: "Sign Out", path: "/signout", onHover: () => {}, leave: () => {}},
    ]

</script>   
<div class="bg-green-500 h-screen w-full overflow-auto " id="nav">
    


    {#if $page.data.user}
    <center>
        <nav class="flex justify-center items-center text-center bg-sky-600 align-middle shadow-2xl rounded-b-2xl mb-4 w-fit pl-[12.5%] pr-[12.5%] h-fit overflow-auto relative">
            <Heading logo={true} {src} onclick={() => goto("/")} size="w-56"/>
            {#each loggedInPages as page}
            <div class="relative button">
                <Button name={page.name} onclick={() => goto(page.path)} hover={page.onHover} leave={page.leave} />
            </div>
            {/each}
            
            <Heading name={$page.data.user.username} src={peep} onclick={() => goto("/")} size="w-56"/>
        </nav>
    </center>
    {:else}
    <center>
        <nav class="flex justify-center items-center text-center bg-sky-600 align-middle shadow-2xl rounded-b-2xl mb-4 w-full h-fit overflow-auto relative">
            <Heading logo={true} {src} onclick={() => goto("/")} size="w-56"/>
            {#each pages as page}
            <div class="relative button">
                <Button name={page.name} onclick={() => goto(page.path)} hover={page.onHover} leave={page.leave}/>
                <div class="active-element"></div>
            </div>
            {/each}
            <Heading  logo={true} src={peep} onclick={() => goto("/")} size="w-56"/>
        </nav>
    </center>
    {/if}

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