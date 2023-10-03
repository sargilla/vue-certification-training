<script setup>
import { ref } from 'vue'

import imageData from '@/assets/data.json'
import Swiper from '@/components/Swiper.vue'
import SwiperSlide from '@/components/SwiperSlide.vue'

const index = ref(0)

const setIndex = (payload) => {
  // console.log(payload)
  index.value = payload
}
</script>
<template>
  <div class="h-screen w-full grid place-items-center">
    <Swiper :list="imageData" :index="index" @submit="setIndex" v-slot="{ item }">
      <SwiperSlide :title="item.title" :image="item.image" />
    </Swiper>
  </div>
</template>

<style scoped></style>
