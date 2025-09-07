<template>
  <div class="country-selector">
    <div class="selected">
      <img
        v-if="selectedCountryData"
        :src="selectedCountryData.flag"
        class="country-selector__flag-icon"
        alt="flag"
      />
      <select
        class="country-selector__select"
        id="country"
        v-model="selectedCountry"
      >
        <option
          v-for="country in countries"
          :key="country.code"
          :value="country.code"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import esFlag from "../../assets/Flags/es.png";
import enFlag from "../../assets/Flags/en.png";
import itFlag from "../../assets/Flags/it.png";
import deFlag from "../../assets/Flags/de.png";
import frFlag from "../../assets/Flags/fr.png";
import euFlag from "../../assets/Flags/eu.png";

const emit = defineEmits<{
  (e: "update:country", country: string): void;
}>();

const countries = ref([
  { code: "ES", name: "España", flag: esFlag },
  { code: "EN", name: "Inglaterra", flag: enFlag },
  { code: "IT", name: "Italia", flag: itFlag },
  { code: "DE", name: "Alemania", flag: deFlag },
  { code: "FR", name: "Francia", flag: frFlag },
  { code: "EU", name: "Europa", flag: euFlag },
]);

const selectedCountry = ref(countries.value[0].code);

const selectedCountryData = computed(() =>
  countries.value.find((c) => c.code === selectedCountry.value)
);

watch(selectedCountry, (newCountry) => {
  emit("update:country", newCountry);
});
</script>
<style lang="less" src="./CountrySelector.less" />
