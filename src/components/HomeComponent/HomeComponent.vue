<template>
  <div class="home-component">
    <AppBar />
    <h2 style="margin-bottom: 0px;">PARTIDOS DE HOY</h2>
    <LastMatches league="English Premier League" />
    <LastMatches league="Spanish La Liga" />
    <LastMatches league="Italian Serie A" />
    <LastMatches league="German Bundesliga" />
    <LastMatches league="French Ligue 1" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppBar from "../AppBar/AppBar.vue";
import LastMatches from "../LastMatches/LastMatches.vue";

const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  error.value = null;
});
</script>
<style lang="less" src="./HomeComponent.less" />
