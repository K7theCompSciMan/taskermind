

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useCookies} from 'vue3-cookies';
import router from "@/router";
import {ref, onMounted} from "vue";
const { cookies } = useCookies();

let userIn = ref("");
let verificationCode = localStorage.getItem("verificationCode");
let user = {email: ""};
onMounted(async() => {
    user = await (await fetch("https://taskermind-api.fly.dev/session/user", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    })).json();
})
const submitForm = async() => {
    console.log(userIn.value);
    console.log(verificationCode);
    if (userIn.value == verificationCode) {
        const res = await fetch("https://taskermind-api.fly.dev/user/verify", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                email: user.email,
            })
        });
        alert("Verification successful");
        localStorage.removeItem("verificationCode");
        router.push('/');
    } else {
        alert("Verification failed");
    }
}


</script>


<template>
<div class="body">
<!--  <form>-->
    <input class = "digs" maxlength="6" type="number" placeholder="Input Verfication Code" v-model="userIn">
    <button class = "button" @click="submitForm()" >Submit</button>

    

    
<!--  </form>-->
</div>
</template>

<style scoped>
.body {
  display: flex;
  justify-content: center; /* centers horizontally */
  align-items: center;     /* centers vertically */
  height: 100vh;           /* full viewport height */
  width: 100vw;            /* full viewport width */
  margin: 0;
  padding: 0;
}
.button{
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: var(--color-secondary);
  color: white;
  font-size: 20px;
  cursor: pointer;
}
.digs {
  width: 300px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding-left: 15px;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}



</style>