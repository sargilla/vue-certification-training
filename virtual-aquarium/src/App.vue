<script setup>
import { onMounted, ref } from 'vue';

import Aquarium from './Aquarium.vue';
import FishForm from './FishForm.vue';

const fishesOnAquarium = ref([]);
const addFish = (payload) => {
    fishesOnAquarium.value.push(payload);
};

const dropLife = () => {
    fishesOnAquarium.value.forEach((fish) => {
        if (fish.health) {
            fish.health--;
        }
    });
};

onMounted(() => {
    setInterval(dropLife, 1000);
});

const feedFish = (index) => {
    if (fishesOnAquarium.value[index].health > 0) {
        fishesOnAquarium.value[index].health = 100;
    }
};
</script>
<template>
    <div class="flex h-screen">
        <FishForm @submit="addFish" />
        <Aquarium :fishes="fishesOnAquarium" @feed="feedFish" />
    </div>
</template>
