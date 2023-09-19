<template>
    <div class="modal-wrapper">
        <div class="modal-wrapper-inner">
            <h3 class="modal-title" v-if="title">{{ title }}</h3>
            <slot />
        </div>
        <button class="rounded-full bg-white p-2 ml-1" @click="$emit('cancel')">
            <XMarkIcon class="h-6 w-6" />
        </button>
    </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
    title: { type: String, default: null },
});
const emit = defineEmits(['cancel']);
</script>
