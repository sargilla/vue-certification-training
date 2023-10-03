<script setup>
defineProps({
  image: String,
  title: String
})
</script>

<template>
  <img :src="image" :alt="title" class="" />
</template>
