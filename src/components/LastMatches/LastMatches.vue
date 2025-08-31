<template>
  <div class="last-matches">
    <h3>{{ formatLeagueName(league) }}</h3>
    <div v-if="loading">Cargando partidos...</div>
    <div class="last-matches__wrapper">
      <div class="last-matches__card" v-for="match in matches" :key="match.idEvent">
          <div class="last-matches__league">
              <img class="last-matches__logo" :src="match.strLeagueBadge" alt="League Logo" />
              <span class="last-matches__league-name">{{ formatLeagueName(match.strLeague) }}</span>
          </div>
          <div class="last-matches__teams">
              <div class="last-matches__team">
                  <img class="last-matches__team-logo" :src="match.strHomeTeamBadge" alt="Home Team Logo" />
                  <span class="last-matches__team-name">{{ match.strHomeTeam }}</span>
                  <span class="last-matches__team-score">{{ match.intHomeScore }}</span>
              </div>
              <div class="last-matches__team">
                  <img class="last-matches__team-logo" :src="match.strAwayTeamBadge" alt="Away Team Logo" />
                  <span class="last-matches__team-name">{{ match.strAwayTeam }}</span>
                  <span class="last-matches__team-score">{{ match.intAwayScore }}</span>
              </div>
          </div>
          <hr style="color: var(--color-primary); border: 1px solid var(--color-primary);" />
          <div class="last-matches__datetime">
            <span class="last-matches__time">{{ formatTime(match.strTime) }}</span>
              <span class="last-matches__date">{{ formatDate(match.dateEvent) }}</span>
              <span class="last-matches__round">Jornada {{ match.intRound }}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs, watch } from 'vue';
import api from '../../services/api';
import type { Match } from './types';

const props = defineProps<{
  league: string;
  date: string;
}>();

const { league, date } = toRefs(props);

const matches = ref<Match[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

function formatDate(dateStr: string): string {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
}

function formatLeagueName(name: string) {
  switch(name) {
    case 'English Premier League':
    return 'Premier League';
    case 'Spanish La Liga':
    return 'La Liga';
    case 'Italian Serie A':
    return 'Serie A';
    case 'German Bundesliga':
    return 'Bundesliga';
    case 'French Ligue 1':
    return 'Ligue 1';
  }
}

function formatTime(time: string): string {
  if (!time) return '';

  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  hour = (hour + 2)  % 24;

  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHour}:${formattedMinutes}`;
}

async function fetchMatches() {
  loading.value = true;
  error.value = null;

  try {
    const response = await api.get<{ events: Match[] }>('/eventsday.php?d=' + date.value + '&l=' + league.value);
    matches.value = response.data.events || [];
    // console.log('Datos de partidos obtenidos:', matches.value);

  } catch (err) {
    error.value = 'No se pudieron cargar los partidos';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMatches);
watch([league, date], fetchMatches);
</script>
<style lang="less" src="./LastMatches.less" />
