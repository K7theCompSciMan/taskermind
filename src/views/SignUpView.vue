<script setup lang="ts">
import {useRouter} from "vue-router";
import {useCookies} from 'vue3-cookies';
import router from "@/router";
import {onMounted} from "vue";
const { cookies } = useCookies();
export type User = {
  id: string,
  email: string
}

let email: string = "";
let password: string = "";

onMounted(async() => {
  if(localStorage.getItem("accessToken")) {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("studentName")
    cookies.remove("refreshToken");
  }
})

const signUp = () => {
  router.push('/signup');
}

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
<div class="body">
<!--  <form>-->
    <input class = "email" type="email" placeholder="Username" v-model="email">
    <input class = "password" type="password" placeholder="Password" v-model="password">
    <br>
    <input class = "password" type="password" placeholder="Confirm Password" v-model="password">
    <p class = match> Does Not Match</p>
    <br>
    <button class = "button" @click="submitForm()" >Submit</button>
    <button class = "signup" @click="signUp()" >Sign Up</button>
    
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
.signup{
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: var(--color-secondary);
  color: white;
  font-size: 20px;
  cursor: pointer;
}


</style>