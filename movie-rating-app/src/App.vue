<script setup>
import { computed, reactive, ref } from 'vue';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/solid';

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
const isEdit = ref(false);
const genres = ['Action', 'Crime', 'Drama', 'Animation', 'Sci-fi'];

const form = reactive({
    id: '',
    name: '', // required
    description: '',
    image: '',
    genres: [], // required
    inTheaters: false,
    rating: null,
});
const requiredFields = ['name', 'genres'];
const errors = ref([]);

const toggleModal = () => {
    showModal.value = showModal.value ? false : true;
};

const formHasErrors = () => {
    errors.value = [];
    requiredFields.forEach((field) => {
        let pass = form[field].length > 0;
        if (!pass) {
            errors.value.push(field);
        }
    });
    return errors.value.length > 0;
};
const hasError = (field) => {
    return errors.value.includes(field);
};
const insertData = () => {
    // console.log(isEdit);
    if (isEdit.value) {
        movies.map((m) => {
            if (m.id === form.id) {
                m.id = form.id;
                m.name = form.name;
                m.description = form.description;
                m.image = form.image;
                m.genres = form.genres;
                m.inTheaters = form.inTheaters;
            }
        });
    } else {
        let movieToAdd = {
            id: Number(Date.now()),
            name: form.name,
            description: form.description,
            image: form.image,
            genres: form.genres,
            inTheaters: form.inTheaters,
            rating: null,
        };
        console.log(movieToAdd, { ...form });
        // form.id = Number(Date.now());
        // form.rating = null;
        // console.log(form);
        movies.push(movieToAdd);
    }
    clearModal();
};
const onSubmit = () => {
    // console.log('has errors', formHasErrors());
    if (!formHasErrors()) insertData();
};
const clearForm = () => {
    form.id = null;
    form.name = null;
    form.description = null;
    form.image = null;
    form.genres = [];
    form.inTheaters = false;
    errors.value = [];
};
const clearModal = () => {
    clearForm();
    isEdit.value = false;
    toggleModal();
};
const editMovie = (movieId) => {
    let movieToEdit = movies.find((m) => m.id == movieId);
    console.log(movieToEdit);
    isEdit.value = true;
    clearForm();
    form.id = movieToEdit.id;
    form.name = movieToEdit.name;
    form.description = movieToEdit.description;
    form.image = movieToEdit.image;
    form.genres = movieToEdit.genres;
    form.inTheaters = movieToEdit.inTheaters;
    if (showModal.value === false) toggleModal();
};
const deleteMovie = (movieId) => {
    let index = movies.findIndex((m) => m.id == movieId);
    if (index != -1) movies.splice(index, 1);
};
const updateRating = ({ id, star }) => {
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
                            @click="toggleModal"
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
                @updateRating="updateRating"
            />
        </div>
        <div class="modal-wrapper" v-if="showModal">
            <div class="modal-wrapper-inner">
                <form @submit.prevent="onSubmit">
                    <div class="movie-form-input-wrapper">
                        <label for="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            v-model="form.name"
                            class="movie-form-input"
                        />
                        <div class="movie-form-error" v-if="hasError('name')">
                            Debe ingresar un nombre
                        </div>
                    </div>
                    <div class="movie-form-input-wrapper">
                        <label for="description">Description</label>
                        <textarea
                            type="text"
                            id="description"
                            v-model="form.description"
                            class="movie-form-textarea"
                        />
                    </div>
                    <div class="movie-form-input-wrapper">
                        <label for="image">Image</label>
                        <input
                            type="text"
                            id="image"
                            v-model="form.image"
                            class="movie-form-input"
                        />
                    </div>
                    <div class="movie-form-input-wrapper">
                        <label for="genres">Genres</label>
                        <select
                            v-model="form.genres"
                            id="genres"
                            multiple
                            class="movie-form-input"
                        >
                            <option
                                v-for="(genre, index) in genres"
                                :key="index"
                                :value="genre"
                            >
                                {{ genre }}
                            </option>
                        </select>
                        <div class="movie-form-error" v-if="hasError('genres')">
                            Debe ingresar un genero
                        </div>
                    </div>
                    <div class="movie-form-input-wrapper">
                        <label
                            for="inTheaters"
                            class="movie-form-checkbox-label"
                        >
                            <input
                                type="checkbox"
                                id="inTheaters"
                                v-model="form.inTheaters"
                                class=""
                                true-value="true"
                                false-value="false"
                            />
                            <span> In Theaters? </span>
                        </label>
                    </div>
                    <div class="movie-form-actions-wrapper">
                        <input type="hidden" v-model="form.id" />
                        <button
                            type="button"
                            class="button"
                            @click="clearModal"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            class="button-primary"
                            v-text="isEdit ? 'Edit Movie' : 'Create'"
                        ></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
