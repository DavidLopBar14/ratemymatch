<template>
  <div class="home-component">
    <AppBar />
    <h2 style="margin-bottom: 0px;">PARTIDOS</h2>
    <div class="home-component__selectors">
      <DaySelector v-model:date="selectedDate"/>
      <CountrySelector v-model:country="selectedCountry"/>
    </div>

    <div v-for="league in getCountryLeagues" :key="league">
      <Matches :league="league" :date="selectedDate"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AppBar from "../AppBar/AppBar.vue";
import Matches from "../Matches/Matches.vue";
import DaySelector from "../DaySelector/DaySelector.vue";
import CountrySelector from "../CountrySelector/CountrySelector.vue";

const loading = ref(true);
const error = ref<string | null>(null);

const selectedDate = ref('');
const selectedCountry = ref('ES');

const getCountryLeagues = computed((): string[] => {
  switch (selectedCountry.value) {
    case 'ES':
      return ['Spanish La Liga', 'Spanish La Liga 2'];
    case 'EN':
      return ['English Premier League', 'English League Championship'];
    case 'IT':
      return ['Italian Serie A', 'Italian Serie B'];
    case 'DE':
      return ['German Bundesliga', 'German 2. Bundesliga'];
    case 'FR':
      return ['French Ligue 1', 'French Ligue 2'];
    default:
      return [];
  }
});

onMounted(async () => {
  loading.value = true;
  error.value = null;
});
</script>
<style lang="less" src="./HomeComponent.less" />
