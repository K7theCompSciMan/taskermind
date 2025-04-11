<script setup lang="ts">
import {useRouter} from "vue-router";
import {useCookies} from 'vue3-cookies';
import router from "@/router";
const { cookies } = useCookies();
export type User = {
  id: string,
  email: string
}

let email: string = "";
let password: string = "";


const submitForm = async() => {
  const res = await fetch("https://taskermind-api.fly.dev/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
  const data = await res.json();
  console.log(data);
  let user = data.user;
  let accessToken = data.accessToken;
  let refreshToken = data.refreshToken;
  localStorage.setItem("user",user);
  localStorage.setItem("accessToken",accessToken);
  localStorage.setItem("refreshToken",refreshToken);
  localStorage.setItem("studentName", user.username)
  cookies.set("refreshToken", refreshToken, 100000000);
  await router.push('/');
}

</script>

<template>
<div>
<!--  <form>-->
    <input type="email" placeholder="Username" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="submitForm()" >Submit</button>
<!--  </form>-->
</div>
</template>

<style scoped>

</style>