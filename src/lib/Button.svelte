<script lang="ts">
    export let name: string;
    export let onclick: () => void;
    export let hover: () => void;
</script>

<button class="p-2 m-2 rounded-md border-gray-300 border-8 bg-sky-400 w-64" on:mouseenter={() => hover()} on:click={() => onclick()}
	>{name}</button
>  