<script lang="ts">
    export let name: string;
    export let onclick: () => void;
    export let hover: () => void;
    export let leave: () => void;
    export let size: string = "w-44";
    export let type: "button" | "submit" | "reset" | null | undefined = "button";
</script>

<button {type} class="p-2 m-2 rounded-2xl shadow-lg bg-sky-400 {size} hover:bg-sky-500 hover:border-gray-400 hover:shadow-slate-300 transition-shadow" style="transition:0.5s" on:mouseenter={() => hover()} on:click={() => onclick()} on:mouseleave={() => leave()}  
	>{name}</button
>