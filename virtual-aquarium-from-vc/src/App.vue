<script setup>
import Aquarium from "@/Aquarium.vue";
import FishForm from "@/FishForm.vue";
import { ref } from "vue";

const allFish = ref([]);

function removeFish(id) {
  allFish.value = allFish.value.filter((fish) => fish.id !== id);
}
</script>
<template>
  <div class="flex">
    <div class="w-1/5">
      <FishForm @add="allFish.push($event)" />
    </div>
    <div class="w-4/5">
      <Aquarium :allFish="allFish" @remove="removeFish($event)" />
    </div>
  </div>
</template>
