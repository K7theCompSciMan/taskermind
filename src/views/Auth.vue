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
  cookies.set("refreshToken", refreshToken, 100000000);
  await router.push('/');
}

</script>

<template>
<div class="body">
<!--  <form>-->
    <input class = "email" type="email" placeholder="Username" v-model="email">
    <input class = "password" type="password" placeholder="Password" v-model="password">
    <br>
    <button class = "button" @click="submitForm()" >Submit</button>

    
<!--  </form>-->
</div>
</template>

<style scoped>

.body {
  
  padding-top: 30%;
  padding-left: 20%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100vh;
}
.email {
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
}
.password {
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
}
.button {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: var(--color-accent);
  color: white;
  font-size: 20px;
  cursor: pointer;
}


</style>