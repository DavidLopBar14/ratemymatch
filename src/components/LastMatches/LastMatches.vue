<template>
  <div class="last-matches">
    <h2>Últimos Partidos</h2>
    <div v-if="loading">Cargando partidos...</div>
    <div class="last-matches__card" v-for="match in matches" :key="match.idEvent">
        <div class="last-matches__league">
            <img class="last-matches__logo" :src="match.strLeagueBadge" alt="League Logo" />
            <span class="last-matches__league-name">{{ match.strLeague }}</span>
        </div>
        <div class="last-matches__teams">
            <div class="last-matches__team">
                <img class="last-matches__logo" :src="match.strHomeTeamBadge" alt="Home Team Logo" />
                <span class="last-matches__team-name">{{ match.strHomeTeam }}</span>
                <span class="last-matches__team-score">{{ match.intHomeScore }}</span>
            </div>
            <div class="last-matches__team">
                <img class="last-matches__logo" :src="match.strAwayTeamBadge" alt="Away Team Logo" />
                <span class="last-matches__away-team-name">{{ match.strAwayTeam }}</span>
                <span class="last-matches__away-team-score">{{ match.intAwayScore }}</span>
            </div>
        </div>
        <div class="last-matches__datetime">
            <span class="last-matches__date">{{ match.dateEvent }}</span>
            <span class="last-matches__time">{{ match.strTime }}</span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../services/api';

interface Match {
  idEvent: string;
  strEvent: string;
  strLeagueBadge: string;
  strHomeTeamBadge: string;
  strAwayTeamBadge: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string;
  strLeague: string;
}

const matches = ref<Match[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await api.get<{ events: Match[] }>('/eventspastleague.php?id=4335');
    matches.value = response.data.events;
    console.log('Datos de partidos obtenidos:', matches.value);

  } catch (err) {
    error.value = 'No se pudieron cargar los partidos';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
<style lang="less" src="./LastMatches.less" />
