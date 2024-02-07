<script lang="ts">
    export let name = "TaskerMind";
    export let textsize = "2xl";
    export let color = "black";
    export let weight = "bold";
    export let size: string = "w-56";
    export let style = " ";
    export let logo: boolean = false;
    export let src: string = "";
    export let onclick: () => void = () => {};
</script>

{#if logo}
    <img {src} alt="TaskerMind Logo" class="w-20 h-20 m-2 rounded-3xl"/>
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="text-{textsize} p-2 m-2 bg-orange-500 {size} border-8 rounded-2xl border-gray-300 font-{color} font-{weight} {style} hover:cursor-pointer" on:click={() =>onclick()}>
    {name}
</div>