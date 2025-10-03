<template>
  <header class="app-bar">
    <div>
      <router-link to="/" class="app-bar__logo">RATE MY MATCH</router-link>
    </div>
    <nav class="app-bar__nav">
      <router-link to="/">Inicio</router-link>

      <router-link v-if="isLoggedIn" to="/profile">Perfil</router-link>
      <router-link v-if="!isLoggedIn" to="/login">Iniciar Sesión</router-link>
      <router-link v-if="!isLoggedIn" to="/signIn">Registrarse</router-link>
      <button @click="handleSignOut" v-if="isLoggedIn">Cerrar Sesión</button>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const router = useRouter();

let auth: any;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>
<style lang="less" src="./AppBar.less" />
