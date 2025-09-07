<template>
  <div class="matches">
    <h3>{{ formatLeagueName(league) }}</h3>
    <div v-if="loading">Cargando partidos...</div>
    <div v-else-if="!matches.length">No hay partidos en este día</div>
    <div class="matches__wrapper">
      <div class="matches__card" v-for="match in matches" :key="match.idEvent">
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
            <span class="matches__team-score">{{ match.intHomeScore }}</span>
          </div>
          <div class="matches__team">
            <img
              class="matches__team-logo"
              :src="match.strAwayTeamBadge"
              alt="Away Team Logo"
            />
            <span class="matches__team-name">{{ match.strAwayTeam }}</span>
            <span class="matches__team-score">{{ match.intAwayScore }}</span>
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
          <span v-if="match.strStatus !== 'Match Finished'" class="matches__live">&bull; LIVE</span>
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

const props = defineProps<{
  league: string;
  date: string;
}>();

const { league, date } = toRefs(props);

const matches = ref<Match[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

function formatDate(dateStr: string): string {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
}

function formatLeagueName(name: string) {
  switch (name) {
    case "English Premier League":
      return "Premier League";
    case "Spanish La Liga":
      return "La Liga";
    case "Italian Serie A":
      return "Serie A";
    case "German Bundesliga":
      return "Bundesliga";
    case "French Ligue 1":
      return "Ligue 1";
    case "Spanish La Liga 2":
      return "La Liga 2";
    case "English League Championship":
      return "Championship";
    case "Italian Serie B":
      return "Serie B";
    case "German 2. Bundesliga":
      return "2. Bundesliga";
    case "French Ligue 2":
      return "Ligue 2";
  }
}

function formatTime(time: string): string {
  if (!time) return "";

  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  hour = (hour + 2) % 24;

  const formattedHour = hour.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHour}:${formattedMinutes}`;
}

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
