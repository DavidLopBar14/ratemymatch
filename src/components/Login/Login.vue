<template>
  <div class="login">
    <form class="login__form">
      <div class="login__field">
        <label class="login__label" for="email">Correo Electrónico</label>
        <input
          class="login__input"
          type="email"
          id="email"
          placeholder="Introduce tu correo electrónico"
          v-model="email"
        />
      </div>
      <div class="login__field">
        <label class="login__label" for="password">Contraseña</label>
        <input
          class="login__input"
          type="password"
          id="password"
          placeholder="Introduce tu contraseña"
          v-model="password"
        />
      </div>
      <div v-if="errMsg" class="login__error">{{ errMsg }}</div>
      <button class="login__submit-button" type="submit" @click.prevent="login">
        Iniciar Sesión
      </button>
      <button
        class="login__google-button"
        type="button"
        @click="loginWithGoogle"
      >
        <img
          class="login__google-icon"
          src="../../assets/googleIcon.png"
          alt="Google Icon"
        />
        Iniciar sesión con Google
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import { GoogleAuthProvider } from "firebase/auth";

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref("");

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Usuario logueado:", data.user);
      router.push("/");
    })
    .catch((error) => {
      console.error(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Correo electrónico no válido.";
          break;
        case "auth/user-disabled":
          errMsg.value = "El usuario ha sido deshabilitado.";
          break;
        case "auth/user-not-found":
          errMsg.value = "Usuario no encontrado.";
          break;
        case "auth/wrong-password":
          errMsg.value = "Contraseña incorrecta.";
          break;
        default:
          errMsg.value = "Error al iniciar sesión: " + error.message;
      }
    });
};

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/");
    })
    .catch((error) => {
      console.error("Error al iniciar sesión con Google:", error);
      alert("Error al iniciar sesión con Google: " + error.message);
    });
};
</script>
<style lang="less" src="./Login.less" />
