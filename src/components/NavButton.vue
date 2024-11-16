<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const props = defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>

<template>
    <button @click="useRouter().push('/about')">{{text}}</button>
</template>


<style scoped>
    button {
        background: transparent;
        border: 1px solid var(--color-primary);
        color: var(--color-text);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1.25rem;
        transition: all 0.2s;
    }
    button:hover {
        color: var(--color-accent);
        scale: 1.1;
        transition: all 0.2s;
    }
</style>