<template>
  <div class="rating-match">
    <h2 class="rating-match__title">Nota del partido</h2>
    <div class="rating-match__rating-options">
        <div class="rating-match__stars">
            <span
              v-for="star in 5"
              :key="star"
              class="rating-match__star"
              :class="{
                active: hoverRated > 0 ? star <= hoverRated : star <= selectedRating,
              }"
              @click="selectRating(star)"
              @mouseover="hoverRating(star)"
              @mouseleave="hoverRating(0)"
              >&#9733;</span
            >
        </div>
      <div class="rating-match__selected-rating" v-if="selectedRating > 0">
        {{ selectedRating }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const selectedRating = ref(0);
const hoverRated = ref(0);
const selectRating = (rating: number) => {
  selectedRating.value = rating;
};
const hoverRating = (rating: number) => {
  hoverRated.value = rating;
};
</script>
<style lang="less" src="./RatingMatch.less" />
