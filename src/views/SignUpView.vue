<script setup lang="ts">
import {useRouter} from "vue-router";
import {useCookies} from 'vue3-cookies';
import emailjs from "@emailjs/browser";
import router from "@/router";
import {onMounted, ref} from "vue";


const { cookies } = useCookies();
export type User = {
  id: string,
  email: string
}

let email: string = "";
let username: string = "";
let password: string = "";
let repassword: string = "";
let matched = ref(false);

const match = () => {
    matched.value = password===repassword
}
   

// onMounted(async() => {
//   if(localStorage.getItem("accessToken")) {
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("studentName")
//     cookies.remove("refreshToken");
//   }
// })


const submitForm = async() => {
  if (matched) {
    console.log(username);
    console.log(email);
    console.log(password);
  const sendEmail = async (templateParams: any) => {
      emailjs.init("UUIdfGoW6u6OLnNc7");
      try {
        const response = await emailjs.send(
            "service_5wobwjn",
            "template_fyibjzi",
            templateParams
        );

        console.log("✅ Email sent successfully!", response);
      } catch (error) {
        console.error("❌ Failed to send email:", error);
      }
    };

  const res = await fetch("https://taskermind-api.fly.dev/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
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
  localStorage.setItem("verificationCode", data.verificationCode);
  localStorage.setItem("studentName", user.username)
  cookies.set("refreshToken", refreshToken, 100000000);
  await sendEmail({email, passcode:data.verificationCode});
  await router.push('/verify');
  }
}

</script>

<template>
<div class="body">
<!--  <form>-->
    <input class = "email" type="email" placeholder="Email" v-model="email">
    <input class = "username" type="text" placeholder="Username" v-model="username">
    <br>
    <input class = "password" type="password" placeholder="Password" v-model="password" v-on:change="match()">
    
    <input class = "repassword"  type="password" placeholder="Confirm Password" v-model="repassword" v-on:change="match()">
    <p v-show="!matched" class = match> Does Not Match</p>
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
.username {
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

.repassword {
    width: 300px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
}
.match {
  color: red;
  font-size: 20px;
}


</style>