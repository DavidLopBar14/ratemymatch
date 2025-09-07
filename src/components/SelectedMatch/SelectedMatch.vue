<template>
  <div class="selected-match">
    <div class="selected-match__content">
      <div class="selected-match__header">
        <h3 class="selected-match__league">{{  formatLeagueName(match.strLeague) }}</h3>
        <div class="selected-match__info">
          <span>{{ formatDate(match.dateEvent) }}</span> &bull; <span class="matches__time">{{ formatTime(match.strTime) }}</span>
        </div>
        <div class="selected-match__teams">
            
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
