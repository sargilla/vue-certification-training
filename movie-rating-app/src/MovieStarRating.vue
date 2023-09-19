<script setup>
import { computed } from 'vue';

import { StarIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
    rating: Number,
});

const unRated = computed(() => {
    return props.rating < 1;
});
</script>
<template>
    <div class="top-star-wrapper">
        <StarIcon
            class="star-icon-big"
            :class="[unRated ? 'star-icon-gray' : 'star-icon-amber']"
        />
        <p class="star-icon-number" v-text="rating ?? '-'"></p>
    </div>
</template>
