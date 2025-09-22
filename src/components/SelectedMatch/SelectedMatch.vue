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
    <div class="selected-match__actions">
      <button class="selected-match__rate-button" :class="{ 'selected-match__rate-button--disabled': !matchIsFinished(match) }" :disabled="!matchIsFinished(match)" @click="showRateMatchInfo = !showRateMatchInfo">
        <span class="selected-match__star">★</span> Valorar Partido
        <span class="selected-match__lock-icon">
          <LockIcon v-if="!matchIsFinished(match)" />
        </span>
      </button>
      <button class="selected-match__share-button">
        <ShareIcon />
      </button>
      <button class="selected-match__close-button" @click="$emit('close')">
        X
      </button>
    </div>
    <div class="selected-match__rate-info">
      <RateMatch v-if="showRateMatchInfo" />
    </div>
</div>
  </div>
</template>
<script setup lang="ts">
import { useDate } from "../../composables/useDate";
import { useTime } from "../../composables/useTime";
import { useLeagueName } from "../../composables/useLeagueName";
import ShareIcon from "../../assets/ShareIcon.vue";
import LockIcon from "../../assets/LockIcon.vue";
import type { Match } from "../Matches/types";
import { ref, toRefs } from "vue";
import RateMatch from "../RateMatch/RatingMatch.vue";
const { formatDate } = useDate();
const { formatTime } = useTime();
const { formatLeagueName } = useLeagueName();
const props = defineProps<{
  match: any;
}>();

const { match } = toRefs(props);

const matchIsFinished = (match: Match) => {
  return (
    match.strStatus === "Match Finished"
  );
};

const showRateMatchInfo = ref(false);

</script>
<style lang="less" src="./SelectedMatch.less" />
