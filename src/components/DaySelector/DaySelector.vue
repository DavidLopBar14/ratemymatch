<!-- <template>
  <div class="day-selector">
    <button class="day-selector__button" @click="prevDay">&#8592;</button>

    <input
      type="date"
      v-model="inputDate"
      @change="onDateChange"
      class="day-selector__input"
    />

    <button class="day-selector__button" @click="nextDay">
      &#8594;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits<{
  (e: "update:date", date: string): void;
}>();

const currentDate = ref(new Date());

const inputDate = ref(formatISODate(currentDate.value));

// const showNextButton = computed(() => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const current = new Date(currentDate.value);
//   current.setHours(0, 0, 0, 0);

//   return today.getTime() > current.getTime();
// });

function prevDay() {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() - 1);
  updateDate(newDate);
}

function nextDay() {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + 1);
  updateDate(newDate);
}

function updateDate(date: Date) {
  currentDate.value = date;
  inputDate.value = formatISODate(date);
}

function onDateChange() {
  const newDate = new Date(inputDate.value);
  updateDate(newDate);
}

function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

watch(
  currentDate,
  (newVal) => {
    emit("update:date", formatISODate(newVal));
  },
  { immediate: true }
);
</script>

<style lang="less" src="./DaySelector.less" /> -->
<template>
  <div class="day-selector">
    <button class="day-selector__button left"><BackIcon /></button>

    <button
      class="day-selector__input">
      {{ inputDate }}
    </button>

    <button class="day-selector__button right">
      <ForwardIcon />
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import BackIcon from '../../assets/Movement/backIcon.vue';
import ForwardIcon from '../../assets/Movement/forwardIcon.vue';

const currentDate = ref(new Date());
const inputDate = ref(formatISODate(currentDate.value));

function formatISODate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

</script>
<style lang="less" src="./DaySelector.less" />
