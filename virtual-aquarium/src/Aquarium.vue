<script setup>
import { onMounted, ref } from 'vue';

import Fish from './Fish.vue';

const props = defineProps({ fishes: Array });
const emit = defineEmits(['feed']);
const aquarium = ref(null);
const aquariumWidth = ref(null);
const aquariumHeight = ref(null);
onMounted(() => {
    aquariumWidth.value = aquarium.value.clientWidth;
    aquariumHeight.value = aquarium.value.clientHeight;
});
</script>

<template>
    <main class="grow relative" ref="aquarium">
        <Fish
            v-for="(fish, index) in fishes"
            :key="index"
            :fish="fish"
            :ah="aquariumHeight"
            :aw="aquariumWidth"
            @click="$emit('feed', index)"
        />
    </main>
</template>

<style scoped></style>
