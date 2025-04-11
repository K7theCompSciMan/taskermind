<template>
  <div class="home-wrapper">
    <div class="home-container">
      <h1 class="home-title" v-if="user" >Welcome <span>{{user.username}}</span></h1>
      <button class="big-button" @click="router.push('/tasks')">Go to Task View</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import { useRouter } from "vue-router";
import router from "@/router";

let user = localStorage.getItem("user");
onMounted(async() => {
  user = await (await fetch("https://taskermind-api.fly.dev/session/user", {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  })).json();
  console.log(user)

})
</script>

<style scoped>
.home-wrapper {
  height: 100vh; /* Fill the screen */
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center; /* Vertically center */
  margin-left: 400px;
}

.home-container {
  text-align: center;
}

.home-title {
  font-size: 3rem;
  margin-bottom: 3.5rem;
}

.big-button {
  font-size: 1.5rem;
  padding: 1rem 2rem;
  background-color: #3b82f6; /* optional: blue */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.big-button:hover {
  background-color: #2563eb; /* slightly darker blue */
}
</style>
