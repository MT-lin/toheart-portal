<template>
  <div class="layout">
    <navbar></navbar>
    <app-main></app-main>
    <!--<img class="logo" :src="img_logo" alt="logo">-->
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
export default {
  components: {
    Navbar,
    AppMain
  }
}
</script>

<style scoped>
  .layout {
    position: relative;
  }
  .logo {
    margin: 0 28px 28px 0;
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: 100;
  }
</style>
