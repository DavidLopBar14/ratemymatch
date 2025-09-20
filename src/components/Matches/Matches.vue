<template>
  <div class="matches">
    <h3>{{ formatLeagueName(league) }}</h3>
    <div v-if="loading">Cargando partidos...</div>
    <div v-else-if="!matches.length">No hay partidos en este día</div>
    <div class="matches__wrapper">
      <div class="matches__card" v-for="match in matches" :key="match.idEvent" @click="$emit('select-match', match)">
        <div class="matches__league">
          <img
            class="matches__logo"
            :src="match.strLeagueBadge"
            alt="League Logo"
          />
          <span class="matches__league-name">{{
            formatLeagueName(match.strLeague)
          }}</span>
        </div>
        <div class="matches__teams">
          <div class="matches__team">
            <img
              class="matches__team-logo"
              :src="match.strHomeTeamBadge"
              alt="Home Team Logo"
            />
            <span class="matches__team-name">{{ match.strHomeTeam }}</span>
            <div class="matches__team-score-container">
              <span class="matches__team-score">{{ match.intHomeScore }}</span>
            </div>
          </div>
          <div class="matches__team">
            <img
              class="matches__team-logo"
              :src="match.strAwayTeamBadge"
              alt="Away Team Logo"
            />
            <span class="matches__team-name">{{ match.strAwayTeam }}</span>
            <div class="matches__team-score-container">
              <span class="matches__team-score">{{ match.intAwayScore }}</span>
            </div>
          </div>
        </div>
        <hr
          style="
            color: var(--color-primary);
            border: 1px solid var(--color-primary);
          "
        />
        <div class="matches__datetime">
          <span class="matches__time">{{ formatTime(match.strTime) }}</span>
          <span class="matches__date">{{ formatDate(match.dateEvent) }}</span>
          <span
            v-if="matchIsLive(match)"
            class="matches__live"
            >&bull; LIVE</span
          >
          <span class="matches__round">Jornada {{ match.intRound }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs, watch } from "vue";
import api from "../../services/api";
import type { Match } from "./types";
import { useDate } from "../../composables/useDate";
import { useTime } from "../../composables/useTime";
import { useLeagueName } from "../../composables/useLeagueName";

const { formatDate } = useDate();
const { formatTime } = useTime();
const { formatLeagueName } = useLeagueName();

const props = defineProps<{
  league: string;
  date: string;
}>();

const emit = defineEmits<{
  (e: "select-match", match: Match): void;
}>();

const { league, date } = toRefs(props);

const matches = ref<Match[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const matchIsLive = (match: Match) => {
  return (
    match.strStatus !== "Match Finished" &&
    match.strStatus !== "Match Postponed" &&
    match.strStatus !== "Not Started" &&
    match.strStatus !== null
  );
};

async function fetchMatches() {
  loading.value = true;
  error.value = null;

  try {
    const response = await api.get<{ events: Match[] }>(
      "/eventsday.php?d=" + date.value + "&l=" + league.value
    );
    matches.value = response.data.events || [];
    console.log("Datos de partidos obtenidos:", matches.value);
  } catch (err) {
    error.value = "No se pudieron cargar los partidos";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchMatches);
watch([league, date], fetchMatches);
</script>
<style lang="less" src="./Matches.less" />
