<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from './NavButton.vue'

const navigate = (path: string) => {
    useRouter().push(path)
}
</script>

<template>
	<nav>
		<Button text="Home" @click="navigate('/')"></Button>
		<Button text="About" @click="navigate('/about')"></Button>
	</nav>
</template>

<style>
nav {
    display: flex;
    justify-content: space-around;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    width: 100vw;
    position: sticky;
    top: 0;
    padding-top: 1vh;
}

</style>
