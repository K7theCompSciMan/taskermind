<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
</script>

<template>
	<div class="container">
		<Nav></Nav>

		<router-view></router-view>
	</div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style scoped>
.container {
	background-color: var((--color-background));
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
