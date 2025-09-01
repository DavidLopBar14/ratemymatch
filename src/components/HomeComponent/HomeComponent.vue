<template>
  <div class="home-component">
    <AppBar />
    <h2 style="margin-bottom: 0px;">PARTIDOS</h2>
    <DaySelector v-model:date="selectedDate"/>
    <Matches league="English Premier League" :date="selectedDate"/>
    <Matches league="Spanish La Liga" :date="selectedDate"/>
    <Matches league="Italian Serie A" :date="selectedDate"/>
    <Matches league="German Bundesliga" :date="selectedDate"/>
    <Matches league="French Ligue 1" :date="selectedDate"/>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppBar from "../AppBar/AppBar.vue";
import Matches from "../Matches/Matches.vue";
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
