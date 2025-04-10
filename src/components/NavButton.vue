<script setup lang="ts">
import { defineProps } from 'vue'

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
    required: false
  }
})

// Optional: icons for each button
const icons: Record<string, string> = {
  Dashboard: "M2.25 12 11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  Tasks: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z",
  Events: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z",
  Calendar: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
}
</script>

<template>
  <router-link :to="target" class="nav-button">
    <svg
      v-if="icons[text]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" :d="icons[text]" />
    </svg>
    <span>{{ text }}</span>
  </router-link>
</template>

<style scoped>
.nav-button {
  display: flex;
  align-items: center;
  position: relative;
  gap: 0.75rem;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid var(--color-primary);
  border-radius: 0.5rem;
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.25rem;
  transition: all 0.2s;
  margin: 1vh 0;
}
.nav-button:hover {
  color: var(--color-accent);
  scale: 1.05;
}
svg {
  position: absolute;
  left: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
