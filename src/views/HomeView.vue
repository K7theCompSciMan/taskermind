<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <!-- Button that navigates to the Task View -->
    <button @click="goToTaskView">Go to Task View</button>
  </div>
</template>


<script lang="ts">
export default {
  name: "Home",
  methods: {
    goToTaskView() {
      // Navigate to TaskView when the button is clicked
      this.$router.push('/task');
    }
  }
};
</script>

<style scoped>
/* Add home page specific styles here */
</style>
