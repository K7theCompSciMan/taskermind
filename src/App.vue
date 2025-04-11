<script setup lang="ts">
import {RouterLink, RouterView, useRouter} from "vue-router";
import Nav from "./components/Nav.vue";
import {onMounted} from "vue";
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
onMounted(async() => {
    let refreshToken = cookies.get("refreshToken");
    if (refreshToken) {
      const res = await fetch("https://taskermind-api.fly.dev/session/refresh", {
        method: "GET",
        headers: {
          'x-refresh': refreshToken
        }
      });
      if (res.ok) {
        const accessToken = (await res.json()).accessToken;

        const userResponse = await fetch("https://taskermind-api.fly.dev/session/user", {
          method: "GET",
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        })
        const user = (await userResponse.json());
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", user);
      }
    } else {
      await useRouter().push("/auth");
    }
})

</script>

<template>
	<div class="container">
		<Nav></Nav>
    <router-view /> <!-- Active component will be rendered here -->
    
    </div>
</template>



<script lang="ts">
export default {
  name: 'App',
};
</script>



<style scoped>
.container {
	background-color: var(--color-background);
	width: 100vw;
  height: 100vh;
  margin-left: 0;
  margin-bottom: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
}

</style>
