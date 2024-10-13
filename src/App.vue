<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>
<style lang="scss">
  // Import custom SASS variable overrides, or alternatively
  // define your variable overrides here instead
  @import './assets/custom.scss';

  // Import Bootstrap and BootstrapVue source SCSS files
  @import '../node_modules/bootstrap/scss/bootstrap.scss';

</style>
<template>
  <body class=" green">
    <header class="">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header>

    <main>
    <TheWelcome />
    <!-- <EventCard /> -->
    <div class="card" style="width: 18rem;">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </main>
</body>
</template>

<style scoped>
body {
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
