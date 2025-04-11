

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useCookies} from 'vue3-cookies';
import router from "@/router";
import {ref, onMounted} from "vue";
const { cookies } = useCookies();



</script>


<template>
<div class="body">
<!--  <form>-->
    <input class = "digs" maxlength="6" type="number" placeholder="Input Verfication Code">
    

    
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