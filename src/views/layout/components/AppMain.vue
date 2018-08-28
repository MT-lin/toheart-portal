<template>
  <div class="appmain">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style scoped>
.appmain {
  clear: both;
}
</style>
