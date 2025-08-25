<template>
  <header class="app-bar">
    <div>
      <router-link to="/" class="app-bar__logo">RATE MY MATCH</router-link>
    </div>
    <nav class="app-bar__nav">
      <router-link to="/">Inicio</router-link>
      <router-link to="/partidos">Partidos</router-link>
      <router-link to="/perfil">Perfil</router-link>
    </nav>
  </header>
</template>
<script setup lang="ts"></script>
<style lang="less" src="./AppBar.less" />
