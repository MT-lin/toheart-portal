<template>
  <div class="layout">
    <navbar></navbar>
    <app-main></app-main>
    <NavbarFooter></NavbarFooter>
    <!--<img class="logo" :src="img_logo" alt="logo">-->
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
import NavbarFooter from './components/NavbarFooter'
export default {
  components: {
    Navbar,
    AppMain,
    NavbarFooter
  }
}
</script>

<style scoped>
  .layout {
    position: relative;
  }
</style>
