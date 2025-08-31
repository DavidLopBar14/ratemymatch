<template>
  <div class="home-component">
    <AppBar />
    <h2 style="margin-bottom: 0px;">PARTIDOS</h2>
    <DaySelector v-model:date="selectedDate"/>
    <LastMatches league="English Premier League" :date="selectedDate"/>
    <LastMatches league="Spanish La Liga" :date="selectedDate"/>
    <LastMatches league="Italian Serie A" :date="selectedDate"/>
    <LastMatches league="German Bundesliga" :date="selectedDate"/>
    <LastMatches league="French Ligue 1" :date="selectedDate"/>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppBar from "../AppBar/AppBar.vue";
import LastMatches from "../LastMatches/LastMatches.vue";
import DaySelector from "../DaySelector/DaySelector.vue";

const loading = ref(true);
const error = ref<string | null>(null);

const selectedDate = ref('')

onMounted(async () => {
  loading.value = true;
  error.value = null;
});
</script>
<style lang="less" src="./HomeComponent.less" />
