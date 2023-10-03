<script setup>
import { ref } from 'vue'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  list: { type: Array, required: true },
  index: { type: Number, defalut: 0 }
})

const ulEl = ref(null)
const transform = ref(0)
const emit = defineEmits(['submit'])

const nextPage = () => {
  console.log(ulEl.value)
  let index = props.index == props.list.length - 1 ? 0 : props.index + 1
  transform.value = (ulEl.value.offsetWidth / props.list.length) * index
  emit('submit', index)
}
const previousPage = () => {
  console.log(ulEl.value.style.width)
  let index = props.index > 0 ? props.index - 1 : props.list.length - 1
  transform.value = (ulEl.value.offsetWidth / props.list.length) * index
  emit('submit', index)
}
</script>

<template>
  <div class="swipper-container">
    <div class="swipper-wrapper">
      <ul ref="ulEl" :style="{ transform: `translate(-${transform}px)` }">
        <li v-for="item in list" :key="item.title">
          <slot :item="item" />
        </li>
      </ul>
      <button class="back" @click="previousPage">
        <ArrowLeftIcon class="w-10 h-10" />
      </button>
      <button class="next" @click="nextPage">
        <ArrowRightIcon class="w-10 h-10" />
      </button>
    </div>
  </div>
</template>

<style>
.swipper-container {
  @apply grid place-items-center mx-auto w-[400px] h-[300px];
}
.swipper-wrapper {
  @apply relative border-2 h-full flex  overflow-hidden w-full;
  transition-property: transform;
}
.swipper-wrapper ul {
  @apply flex flex-nowrap;
  transition: transform 1s ease-in-out;
}

.swipper-wrapper ul li {
  @apply w-[400px] h-[300px];
}

.swipper-wrapper .back {
  @apply absolute top-[50%] left-2 right-auto text-white rounded-full bg-slate-500/50 p-1 drop-shadow-md;
}
.swipper-wrapper .next {
  @apply absolute  top-[50%] left-auto right-2 text-white  rounded-full bg-slate-500/50 p-1 drop-shadow-md;
}
</style>
