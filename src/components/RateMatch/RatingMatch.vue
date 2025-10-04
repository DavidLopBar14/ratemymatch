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
      <div class="rating-match__numbers" v-if="!noRating">
        <span
          v-for="num in 11"
          :key="num - 1"
          class="rating-match__number"
          :class="{ active: num - 1 === selectedRating }"
          @click="selectRating(num - 1)"
        >
          {{ num - 1 }}
        </span>
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
    <button class="rating-match__submit-button">Enviar valoración</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const selectedRating = ref(0);
const noRating = ref(false);
const selectRating = (rating: number) => {
  selectedRating.value = rating;
};
</script>
<style lang="less" src="./RatingMatch.less" />
