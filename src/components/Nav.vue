<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from './NavButton.vue'
import { ref } from 'vue';

const navigate = (path: string) => {
    useRouter().push(path)
}

const collapsed = ref(false);
</script>

<template>
    <Transition>
        <nav v-if="!collapsed">
            <button class="collapse" @click="collapsed = true" >
                <svg class="collapser" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
            </button>
            <Button text="Dashboard" target="/" image_src=""  ></Button>
            <Button text="Tasks" target="/tasks" image_src=""  ></Button>
            <Button text="Events" target="/events" image_src=""  ></Button>
            <Button text="Calendar" target="/calendar" image_src=""  ></Button>
        </nav>
    </Transition>
    <button class="open" @click="collapsed = false" v-if="collapsed" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="collapser">
            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
          </svg>
          
    </button>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transform: translateX(-10vw);
  transition: transform 2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


svg.collapser {
    width: 100%;
    height: 100%;
    scale: 7;
}
.open {
    position: absolute;
    left: 1%;
    top: 1.5%;
    background: transparent;
    color: currentColor;
    outline: none;
    border: none;
    cursor: pointer;
    width: 1rem;
    height: 1rem;
}
.collapse {
    position: absolute;
    right: 5%;
    top: 1.5%;
    background: transparent;
    color: currentColor;
    outline: none;
    border: none;
    cursor: pointer;
    width: 1rem;
    height: 1rem;
}
.collapse:hover {
    color: var(--color-accent);
    scale: 1.1;
    transition: all 0.2s;
}
nav {
    display: flex;
    flex-direction: column;
    background-color: var(--color-secondary);
    border: 1px solid var(--color-border);
    width: 10vw;
    position: sticky;
    top: 0;
    padding-top: 5vh;
    padding-left: 1vw;
    padding-right: 1vw;
    border-radius: 20px;
    position: relative;
}

</style>
