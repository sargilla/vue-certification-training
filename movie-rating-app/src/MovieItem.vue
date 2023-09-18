<script setup>
import { computed } from 'vue';

import { PencilIcon, StarIcon, TrashIcon } from '@heroicons/vue/24/solid';

const props = defineProps(['movie']);
// const emits = defineEmits(['edit', 'delete', 'update-rating']);
const unRated = computed(() => {
    return props.movie.rating < 1;
});
</script>

<template>
    <div class="movie-card group">
        <div class="top-star-wrapper">
            <StarIcon
                class="star-icon-big"
                :class="[unRated ? 'star-icon-amber' : 'star-icon-gray']"
            />
            <p class="star-icon-number" v-text="unRated ?? '-'"></p>
        </div>
        <img :src="movie.image" :alt="movie.name" class="movie-image" />
        <div class="movie-data">
            <h1 class="movie-title">{{ movie.name }}</h1>
            <p class="movie-genre-pill-wrapper">
                <span
                    class="movie-genre-pill"
                    v-for="(genre, index) in movie.genres"
                    :key="index"
                    v-text="genre"
                />
            </p>
            <p class="movie-description" v-text="movie.description" />
            <div class="flex justify-between">
                <p class="rating-wrapper">
                    <span class="rating-text">
                        Rating: ({{ movie.rating }}/5)</span
                    >
                    <button
                        v-for="star in 5"
                        :key="star"
                        @click="$emit('updateRating', { id: movie.id, star })"
                        :disabled="star === movie.rating"
                    >
                        <StarIcon
                            class="star-icon"
                            :class="[
                                star <= movie.rating
                                    ? 'star-icon-amber'
                                    : 'star-icon-gray',
                            ]"
                        />
                    </button>
                </p>
                <p class="hidden group-hover:block">
                    <button
                        class="crud-buttons"
                        @click="$emit('edit', movie.id)"
                    >
                        <PencilIcon class="crud-icons" />
                    </button>
                    <button
                        class="crud-buttons ml-2"
                        @click="$emit('delete', movie.id)"
                    >
                        <TrashIcon class="crud-icons" />
                    </button>
                </p>
            </div>
        </div>
    </div>
    <!-- Start your template here -->
</template>
