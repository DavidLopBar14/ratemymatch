<template>
  <div>
    <AppBar />
     <router-view />
  </div>
</template>
<script setup lang="ts">
import AppBar from "./components/AppBar/AppBar.vue";
// import { onMounted } from 'vue';
// import { analytics, auth } from './utils/firebase';

// onMounted(() => {
//   auth.onAuthStateChanged((user: any) => {
//     if(user) {
//       console.log('Usuario logueado')
//     }
//     else {
//       console.log('Usuario no logueado')
//     }
//   })
// })
</script>
<style lang="less" />