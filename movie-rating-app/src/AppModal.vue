<template>
    <Transition>
        <div class="modal-wrapper" v-if="show">
            <div class="modal-wrapper-inner">
                <h3 class="modal-title" v-if="title">{{ title }}</h3>
                <slot />
            </div>
            <button
                class="rounded-full bg-white p-2 ml-1"
                @click="$emit('cancel')"
            >
                <XMarkIcon class="h-6 w-6" />
            </button>
        </div>
    </Transition>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
    title: { type: String, default: null },
    show: { type: Boolean, default: false },
});
const emit = defineEmits(['cancel']);
</script>
<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-active .modal-wrapper-inner,
.v-leave-active .modal-wrapper-inner {
    transition: all 0.3s ease-in-out;
}

.v-enter-from .modal-wrapper-inner,
.v-leave-to .modal-wrapper-inner {
    transform: translateY(-50px);
    opacity: 0;
}
.v-enter-active .modal-wrapper-inner {
    transition-delay: 0.2s;
}
</style>
