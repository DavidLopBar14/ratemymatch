<template>
  <header class="app-bar">
    <div>
      <router-link to="/" class="app-bar__logo">RATE MY MATCH</router-link>
    </div>
    <nav class="app-bar__nav">
      <router-link to="/">Inicio</router-link>
      <router-link v-if="isLoggedIn" to="/profile">Perfil</router-link>
      <router-link v-else to="/login" class="app-bar__login"
        ><LoginIcon class="app-bar__login-icon" />Iniciar Sesión /
        Registrarse</router-link
      >
      <button @click="handleSignOut" v-if="isLoggedIn" class="app-bar__logout">
        <LogoutIcon class="app-bar__logout-icon" />Cerrar Sesión
      </button>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import LoginIcon from "../../assets/LoginIcon.vue";
import LogoutIcon from "../../assets/LogoutIcon.vue";

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
