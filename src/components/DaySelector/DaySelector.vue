<template>
  <div class="day-selector">
    <button class="day-selector__button" @click="prevDay">&#8592;</button>
    <span>{{ formattedDate }}</span>
    <button v-if="showNextButton" class="day-selector__button" @click="nextDay">
      &#8594;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const emit = defineEmits<{
  (e: "update:date", date: string): void;
}>();

const currentDate = ref(new Date());

const showNextButton = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const current = new Date(currentDate.value);
  current.setHours(0, 0, 0, 0);

  return today.getTime() > current.getTime();
});

function prevDay() {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() - 1);
  currentDate.value = newDate;
}

function nextDay() {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + 1);
  currentDate.value = newDate;
}

function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    month: "2-digit",
    day: "2-digit",
  });
}

const formattedDate = computed(() => formatDisplayDate(currentDate.value));

watch(
  currentDate,
  (newVal) => {
    emit("update:date", formatISODate(newVal));
  },
  { immediate: true }
);
</script>

<style lang="less" src="./DaySelector.less" />
