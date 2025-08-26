<template>
    <div class="home-component">
        <AppBar />
        <LastMatches />
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppBar from '../AppBar/AppBar.vue';
import LastMatches from '../LastMatches/LastMatches.vue';

const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
    loading.value = true;
    error.value = null;

})
</script>
<style lang="less" src="./HomeComponent.less" />