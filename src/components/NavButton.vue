<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    image_src: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div @click="useRouter().push(target)">
        <svg @click="useRouter().push(target)" v-if="text=='Dashboard'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <svg @click="useRouter().push(target)" v-if="text=='Calendar'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        <svg @click="useRouter().push(target)" v-if="text=='Events'" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"></path>
        </svg>
        <svg @click="useRouter().push(target)" v-if="text=='Tasks'" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"></path>
        </svg>
        <button @click="useRouter().push(target)">{{text}}</button>
    </div>
</template>


<style scoped>
    svg {
        position: absolute;
        left: 5%;
        top: 25%;
        width: 1.5rem;
        height: 1.5rem;
    }
    img {
        cursor: pointer;
        width: 10%;
        height: 100%;
        border: 1px solid black
    }
    button {
        cursor: pointer;
        background: transparent;
        border: none;
        outline: none;
        color: currentColor;
        font-size: 1.25rem;
        width: 90%;
        height: 100%;
        text-align: center;
    }
    div {
        position: relative;
        background: transparent;
        border: 1px solid var(--color-primary);
        color: var(--color-text);
        padding: 0.5rem 1rem;
        padding-left: 20%;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1.25rem;
        transition: all 0.2s;
        margin-top: 1vh;
        margin-bottom: 1vh;
    }
    div:hover {
        cursor: pointer;
        color: var(--color-accent);
        scale: 1.1;
        transition: all 0.2s;
    }
</style>