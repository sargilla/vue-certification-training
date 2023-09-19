<template>
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
            <label for="inTheaters" class="movie-form-checkbox-label">
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
            <button type="button" class="button" @click="cancel">Cancel</button>

            <button
                type="submit"
                class="button-primary"
                v-text="isEdit ? 'Edit Movie' : 'Create'"
            ></button>
        </div>
    </form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({
    modelValue: { type: Object, default: null },
});
const emit = defineEmits(['update:modelValue', 'cancel']);
const errors = ref([]);
const isEdit = ref(false);
const requiredFields = ['name', 'genres'];
const genres = ['Action', 'Crime', 'Drama', 'Animation', 'Sci-fi'];

const form = reactive({
    id: props.modelValue?.id || '',
    name: props.modelValue?.name || '',
    description: props.modelValue?.description || '',
    image: props.modelValue?.image || '',
    inTheaters: props.modelValue?.inTheaters || false,
    genres: props.modelValue?.genres || [],
    rating: props.modelValue?.rating || null,
});

const hasError = (field) => {
    return errors.value.includes(field);
};

const formHasErrors = () => {
    errors.value = [];
    requiredFields.forEach((field) => {
        if (!form[field].length > 0) {
            errors.value.push(field);
        }
    });
    return errors.value.length > 0;
};

const onSubmit = () => {
    const data = {
        id: form.id || Number(Date.now()),
        name: form.name,
        description: form.description,
        image: form.image,
        genres: form.genres,
        inTheaters: form.inTheaters,
        rating: form.rating,
    };
    if (!formHasErrors()) emit('update:modelValue', data);
};

const cancel = () => {
    clearForm();
    emit('cancel');
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
</script>

<style lang="scss" scoped></style>
