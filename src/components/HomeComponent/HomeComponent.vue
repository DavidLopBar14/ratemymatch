<template>
  <div class="home-component">
    <div class="home-component__selectors">
      <DaySelector v-model:date="selectedDate" />
      <CountrySelector v-model:country="selectedCountry" />
    </div>

    <div v-for="league in getCountryLeagues" :key="league">
      <Matches :league="league" :date="selectedDate" @select-match="openMatch" />
    </div>

    <div v-if="selectedMatch" class="home-component__selected-match" @click.self="closeMatch">
      <div class="home-component__selected-match-content">
        <SelectedMatch :match="selectedMatch" @close="closeMatch" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Matches from "../Matches/Matches.vue";
import DaySelector from "../DaySelector/DaySelector.vue";
import CountrySelector from "../CountrySelector/CountrySelector.vue";
import SelectedMatch from "../SelectedMatch/SelectedMatch.vue";

const loading = ref(true);
const error = ref<string | null>(null);
const selectedMatch = ref<any | null>(null);

const selectedDate = ref("");
const selectedCountry = ref("ES");

const getCountryLeagues = computed((): string[] => {
  switch (selectedCountry.value) {
    case "ES":
      return ["Spanish La Liga", "Spanish La Liga 2"];
    case "EN":
      return ["English Premier League"];
    case "IT":
      return ["Italian Serie A"];
    case "DE":
      return ["German Bundesliga"];
    case "FR":
      return ["French Ligue 1"];
    case "EU":
      return [
        "UEFA Champions League",
        "UEFA Europa League",
        "UEFA Conference League",
      ];
    default:
      return [];
  }
});

const openMatch = (match: any) => {
  selectedMatch.value = match;
  console.log("Selected match:", match);
};

const closeMatch = () => {
  selectedMatch.value = null;
};

onMounted(async () => {
  loading.value = true;
  error.value = null;
});
</script>
<style lang="less" src="./HomeComponent.less" />
