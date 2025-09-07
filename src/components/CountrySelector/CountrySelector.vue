<template>
    <div class="country-selector">
        <select class="country-selector__select" id="country" v-model="selectedCountry">
            <option v-for="country in countries" :key="country.code" :value="country.code">
                {{ country.name }}
            </option>
        </select>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
    (e: 'update:country', country: string): void;
}>();

const countries = ref([
    { code: 'ES', name: 'España' },
    { code: 'EN', name: 'Inglaterra' },
    { code: 'IT', name: 'Italia' },
    { code: 'DE', name: 'Alemania' },
    { code: 'FR', name: 'Francia' },
]);

const selectedCountry = ref(countries.value[0].code);

watch(selectedCountry, (newCountry) => {
    emit('update:country', newCountry);
});

</script>
<style lang="less" src="./CountrySelector.less" />