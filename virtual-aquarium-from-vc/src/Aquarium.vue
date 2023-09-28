<script setup>
defineProps({
  allFish: { type: Array, default: () => [] },
});
defineEmits(["remove"]);
import Fish from "./Fish.vue";
</script>

<template>
  <div class="aquarium" id="aquarium">
    <Fish
      v-for="fish in allFish"
      :key="fish.name"
      v-bind="fish"
      @remove="$emit('remove', fish.id)"
    />
  </div>
</template>

<style scoped>
.aquarium {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("/bg.jpg") no-repeat center center;
  background-size: cover;
  overflow: hidden;
}
</style>
