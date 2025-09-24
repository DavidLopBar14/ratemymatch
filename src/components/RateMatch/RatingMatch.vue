<template>
  <div class="rating-match">
    <h2 class="rating-match__title">Nota del partido</h2>
    <span class="rating-match__no-rating">
      <input
        class="rating-match__checkbox"
        type="checkbox"
        id="no-rating"
        v-model="noRating"
        value="0"
      />
      <label class="rating-match__label" for="no-rating">Sin nota</label>
    </span>
    <div class="rating-match__rating-options">
      <div class="rating-match__stars">
        <div class="rating-match__stars-container" v-if="!noRating">
          <span
            v-for="star in 5"
            :key="star"
            class="rating-match__star"
            :class="{
              active:
                hoverRated > 0 ? star <= hoverRated : star <= selectedRating,
            }"
            @click="selectRating(star)"
            @mouseover="hoverRating(star)"
            @mouseleave="hoverRating(0)"
            >&#9733;</span
          >
        </div>
      </div>
      <div
        class="rating-match__selected-rating"
        v-if="selectedRating > 0 && !noRating"
      >
        {{ selectedRating }}
      </div>
    </div>
    <div class="rating-match__comments">
      <textarea
        class="rating-match__textarea"
        id="comments"
        rows="6"
        placeholder="Escribe tus comentarios sobre el partido."
      ></textarea>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const selectedRating = ref(0);
const hoverRated = ref(0);
const noRating = ref(false);
const selectRating = (rating: number) => {
  selectedRating.value = rating;
};
const hoverRating = (rating: number) => {
  hoverRated.value = rating;
};
</script>
<style lang="less" src="./RatingMatch.less" />
