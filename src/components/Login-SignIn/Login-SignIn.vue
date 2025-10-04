<template>
  <div class="login-signIn">
    <div class="login-signIn__buttons">
      <span
        class="login-signIn__option login"
        :class="{ active: activeForm === 'login' }"
        @click="activeForm = 'login'"
      >
        Iniciar sesión
      </span>
      <span
        class="login-signIn__option signIn"
        :class="{ active: activeForm === 'signIn' }"
        @click="activeForm = 'signIn'"
      >
        Registrarse
      </span>
    </div>

    <div class="login-signIn__form">
      <Login v-if="activeForm === 'login'" />
      <SignIn v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Login from "../Login/Login.vue";
import SignIn from "../SignIn/SignIn.vue";

const activeForm = ref<"login" | "signIn">("login");
</script>

<style lang="less" src="./Login-SignIn.less" />
