<template>
  <div class="selected-match">
    <div class="selected-match__content">
      <div class="selected-match__header">
        <h3 class="selected-match__league">{{  formatLeagueName(match.strLeague) }}</h3>
        <div class="selected-match__info">
          <span>{{ formatDate(match.dateEvent) }}</span> &bull; <span class="matches__time">{{ formatTime(match.strTime) }}</span>
        </div>
        <div class="selected-match__teams">
          <div class="selected-match__home-team">
            <img v-if="match.strHomeTeamBadge" :src="match.strHomeTeamBadge" alt="Home Team Badge" class="selected-match__team-badge" />
            <span class="selected-match__team-name">{{ match.strHomeTeam }}</span>
          </div>
          <div class="selected-match__score">
            <span>{{ match.intHomeScore }}</span> - <span>{{ match.intAwayScore }}</span>
          </div>
          <div class="selected-match__away-team">
            <img v-if="match.strAwayTeamBadge" :src="match.strAwayTeamBadge" alt="Away Team Badge" class="selected-match__team-badge" />
            <span class="selected-match__team-name">{{ match.strAwayTeam }}</span>
          </div>
        </div>
    </div>
    <button class="selected-match__close-button" @click="$emit('close')">
      X
    </button>
</div>
  </div>
</template>
<script setup lang="ts">
import { useDate } from "../../composables/useDate";
import { useTime } from "../../composables/useTime";
import { useLeagueName } from "../../composables/useLeagueName";
const { formatDate } = useDate();
const { formatTime } = useTime();
const { formatLeagueName } = useLeagueName();
const props = defineProps<{
  match: any;
}>();
</script>
<style lang="less" src="./SelectedMatch.less" />
