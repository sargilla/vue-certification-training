<script setup>
import { computed, reactive, ref } from 'vue';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/solid';

import AppModal from './AppModal.vue';
import MovieForm from './MovieForm.vue';
import MovieItem from './MovieItem.vue';
import { items } from './movies.json';

const navigation = [{ name: 'Movies', href: '/', current: true }];

const movies = reactive(items);
const totalMovies = computed(() => movies.length);
const averageRating = computed(() =>
    Number(
        movies.reduce((acum, movie) => acum + movie.rating, 0) / movies.length
    ).toFixed(1)
);

const showModal = ref(false);

const toggleModal = () => {
    showModal.value = showModal.value ? false : true;
};

const movieToEdit = ref(null);
const createMovie = () => {
    movieToEdit.value = null;
    toggleModal();
};
const editMovie = (movieId) => {
    movieToEdit.value = movies.find((m) => m.id == movieId);
    if (showModal.value === false) toggleModal();
};

const insertData = (movie) => {
    const isNew = !movies.find((m) => m.id === movie.id);
    if (isNew) {
        movies.push({ ...movie });
    } else {
        movies.map((m) => {
            if (m.id === movie.id) {
                m.id = movie.id;
                m.name = movie.name;
                m.description = movie.description;
                m.image = movie.image;
                m.genres = movie.genres;
                m.inTheaters = movie.inTheaters;
            }
        });
    }
    toggleModal();
};

const deleteMovie = (movieId) => {
    let index = movies.findIndex((m) => m.id == movieId);
    if (index != -1) movies.splice(index, 1);
};
const updateRating = (id, star) => {
    let index = movies.findIndex((m) => m.id == id);
    if (index != -1) movies[index].rating = star;
};
const resetRankings = () => {
    movies.map((m) => (m.rating = null));
};
</script>

<template>
    <div class="app">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="mx-auto max-w-7xl">
                <div class="relative flex h-16 items-center justify-between">
                    <div
                        class="absolute inset-y-0 left-0 flex items-center sm:hidden"
                    >
                        <!-- Mobile menu button-->
                        <DisclosureButton
                            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon
                                v-if="!open"
                                class="block h-6 w-6"
                                aria-hidden="true"
                            />
                            <XMarkIcon
                                v-else
                                class="block h-6 w-6"
                                aria-hidden="true"
                            />
                        </DisclosureButton>
                    </div>
                    <div
                        class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
                    >
                        <div class="hidden sm:block">
                            <div class="flex space-x-4 items-center text-white">
                                <a
                                    v-for="item in navigation"
                                    :key="item.name"
                                    :href="item.href"
                                    :class="[
                                        item.current
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'rounded-md px-3 py-2 text-sm font-medium',
                                    ]"
                                    :aria-current="
                                        item.current ? 'page' : undefined
                                    "
                                    >{{ item.name }}</a
                                >
                                <span> Total Movies: {{ totalMovies }}</span>
                                <span class="px-2">/</span>
                                <span>
                                    Average Rating: {{ averageRating }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div
                        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0"
                    >
                        <button @click="resetRankings" class="toolbar-buttons">
                            Reset Rankings
                        </button>
                        <button
                            @click="createMovie"
                            type="button"
                            class="toolbar-buttons"
                        >
                            <PlusIcon class="h-6 w-6" aria-hidden="true" />
                            <span class="hidden sm:ml-2 sm:block"
                                >Create a Movie
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="sm:hidden">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <DisclosureButton
                        v-for="item in navigation"
                        :key="item.name"
                        as="a"
                        :href="item.href"
                        :class="[
                            item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium',
                        ]"
                        :aria-current="item.current ? 'page' : undefined"
                        >{{ item.name }}</DisclosureButton
                    >
                </div>
            </DisclosurePanel>
        </Disclosure>
        <div class="movies">
            <MovieItem
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                @edit="editMovie"
                @delete="deleteMovie"
                @update:rating="updateRating"
            />
        </div>
        <AppModal
            @cancel="toggleModal"
            v-if="showModal"
            :title="movieToEdit?.id ? 'Edit Movie' : 'Add Movie'"
        >
            <MovieForm
                @cancel="toggleModal"
                :modelValue="movieToEdit"
                @update:modelValue="insertData"
            />
        </AppModal>
    </div>
</template>
