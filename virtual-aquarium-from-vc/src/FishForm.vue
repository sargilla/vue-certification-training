<script setup>
import { ref } from "vue";
const defaultType = "golden-purple-fish";
const emit = defineEmits(["add"]);

const randomNames = [
  "The Fish with No Name",
  "Gilbert",
  "Mr. Buttons",
  "Blubbles",
  "Dinner",
];

const newFish = ref({
  type: defaultType,
  name: getRandomName(),
});

const fishes = [
  { name: "Golden Purple Fish", type: "golden-purple-fish", size: "w-36" },
  { name: "Goldfish", type: "goldfish", size: "w-28" },
  { name: "Guppie", type: "guppie", size: "w-24" },
  { name: "Tropical Fish", type: "tropical-fish", size: "w-48" },
  { name: "Tuna", type: "tuna", size: "w-12" },
];

const input = ref();
function addFish() {
  console.log("adding fish");
  if (!newFish.value.name) return;
  emit("add", {
    id: Math.random().toString(36),
    ...newFish.value,
    size: fishes.find((fish) => fish.type === newFish.value.type).size,
  });
  reset();
  input.value.focus();
}

function reset() {
  newFish.value.name = getRandomName();
}

function getRandomName() {
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}
</script>
<template>
  <form class="h-full p-5 bg-[#1f3d7c]" @submit.prevent="addFish">
    <label>Fish Type</label>
    <ul class="flex flex-wrap mt-4">
      <li
        @click="newFish.type = fish.type"
        v-for="fish in fishes"
        :key="fish.type"
        class="block w-1/2 mb-2 cursor-pointer"
        :class="{
          selected: fish.type === newFish.type,
        }"
      >
        <img :src="`/${fish.type}.png`" :alt="fish.name" class="w-24" />
      </li>
    </ul>

    <label for="fish-name" class="mt-10">Name </label>
    <input
      id="fish-name"
      ref="input"
      type="text"
      v-model="newFish.name"
      class="w-full p-2 text-lg rounded"
      placeholder="Mr. Buttons"
    />
    <button
      type="submit"
      class="w-full p-4 mt-5 text-xl text-white bg-red-600 rounded"
    >
      Add Fish
    </button>
  </form>
</template>

<style scoped>
label {
  @apply text-white font-bold mb-2 block;
}
.selected {
  filter: drop-shadow(2px 2px 0 #00cfff) drop-shadow(-2px -2px 0 #00cfff)
    drop-shadow(2px -2px 0 #00cfff) drop-shadow(-2px 2px 0 #00cfff);
}
</style>
