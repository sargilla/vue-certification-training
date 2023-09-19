<script setup>
import { computed, onMounted, ref } from 'vue';

import { items } from '@/movies.json';
import MovieStarRating from '@/MovieStarRating.vue';

// Right now we're just displaying the info for the first movie
// You should get the id from the URL and display the info for the proper movie
// 💡 HINT: You do NOT need to modifiy the template
const props = defineProps({ id: Number });

const movies = ref(items);
onMounted(() => {
    console.log(
        movies.value,
        movies.value.find((m) => m.id === props.id)
    );
});
const movie = computed(() => movies.value.find((m) => m.id === props.id));
</script>
<template>
    <div
        class="container flex items-center max-w-6xl gap-4 p-10 m-auto text-white"
    >
        <figure class="relative">
            <MovieStarRating
                :rating="movie.rating"
                class="absolute top-5 right-5"
            />
            <img :src="movie.image" :alt="movie.name" class="w-96" />
        </figure>

        <div>
            <h1 class="mb-4 text-5xl">{{ movie.name }}</h1>
            <div class="mb-3 movie-genre-pill-wrapper">
                <span
                    v-for="genre in movie.genres"
                    :key="`${movie.id}-${genre}`"
                    class="!text-lg movie-genre-pill"
                    >{{ genre }}</span
                >
            </div>
            <p class="text-xl">{{ movie.description }}</p>
            <button class="button-primary" @click="$router.go(-1)">Back</button>
        </div>
    </div>
</template>
