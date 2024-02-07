<script lang="ts">
    export let name: string;
    export let onclick: () => void;
    export let hover: () => void;
    export let leave: () => void;
    export let size: string = "w-44";
</script>

<button class="p-2 m-2 rounded-2xl border-gray-300 border-8 bg-sky-400 {size} hover:bg-sky-500 hover:border-gray-400" on:mouseenter={() => hover()} on:click={() => onclick()} on:mouseleave={() => leave()}  
	>{name}</button
>  