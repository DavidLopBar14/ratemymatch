<template>
  <div class="signIn">
    <h2 class="signIn__title">Crear Cuenta</h2>
    <form class="signIn__form">
      <div class="signIn__field">
        <label class="signIn__label" for="email">Correo Electrónico</label>
        <input
          class="signIn__input"
          type="email"
          id="email"
          placeholder="Introduce tu correo electrónico"
          v-model="email"
        />
      </div>
      <div class="signIn__field">
        <label class="signIn__label" for="password">Contraseña</label>
        <input
          class="signIn__input"
          type="password"
          id="password"
          placeholder="Introduce tu contraseña"
          v-model="password"
        />
      </div>
      <div v-if="errMsg" class="signIn__error">{{ errMsg }}</div>
      <button class="signIn__submit-button" type="submit" @click="signIn">
        Registrarse
      </button>
      <button
        class="signIn__google-button"
        type="button"
        @click="signInWithGoogle"
      >
        <img
          class="signIn__google-icon"
          src="../../assets/googleIcon.png"
          alt="Google Icon"
        />
        Registrarse con Google
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref("");

const signIn = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Usuario registrado:", data.user);
      router.push("/");
    })
    .catch((error) => {
      console.error("Error al registrar usuario:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          errMsg.value = "El correo electrónico ya está en uso.";
          break;
        case "auth/invalid-email":
          errMsg.value = "El correo electrónico no es válido.";
          break;
        case "auth/weak-password":
          errMsg.value = "La contraseña es demasiado débil.";
          break;
        default:
          errMsg.value = "Error al registrar usuario. Inténtalo de nuevo.";
          break;
      }
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/prueba");
    })
    .catch((error) => {
      // handle error
    });
};
</script>
<style lang="less" src="./SignIn.less" />
