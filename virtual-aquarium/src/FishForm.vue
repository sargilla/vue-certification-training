<script setup>
import { ref } from 'vue';

import Fish from './Fish.vue';

const emit = defineEmits(['submit']);
const selectedFish = ref(null);
const fishName = ref('');
const fishes = [
    'golden-purple-fish',
    'tuna',
    'goldfish',
    'guppie',
    'tropical-fish',
];
const isSelected = (fish) => selectedFish.value === fish;
const error = ref(null);
const addFish = () => {
    error.value = '';
    if (selectedFish.value && fishName.value) {
        emit('submit', {
            type: selectedFish.value,
            name: fishName.value,
            health: Math.floor(Math.random() * 100),
        });
        selectedFish.value = null;
        fishName.value = '';
    } else {
        error.value = 'Debe seleccionar un pez y escribir un nombre';
    }
};
</script>
<template>
    <aside class="flex-none w-64">
        <h3 class="title">Fish Type</h3>
        <div class="grid grid-cols-2 gap-2 mt-5">
            <img
                v-for="fish in fishes"
                :src="`/${fish}.png`"
                class="cursor-pointer"
                :class="[isSelected(fish) ? 'selected' : '']"
                :key="fish"
                @click="selectedFish = fish"
            />
        </div>
        <h3 class="title mt-5">Name</h3>
        <input
            type="text"
            v-model="fishName"
            placeholder="Insert name"
            required
            class="w-full p-2 rounded text-black"
        />
        <button
            class="px-2 py-1 rounded bg-red-500 w-full mt-3"
            @click="addFish"
        >
            Add Fish
        </button>
        <p v-if="error" class="text-red-100 font-bold text-center mt-3">
            {{ error }}
        </p>
    </aside>
</template>
<style scoped>
img:hover {
    filter: drop-shadow(0px 0px 10px #ec6666);
}
.selected {
    filter: drop-shadow(0px 0px 15px #ffffff);
}
</style>
