<script setup>
import { ref, computed, onMounted } from "vue";
defineProps({
  type: { type: String },
  name: { type: String },
  size: { type: String },
});
const emit = defineEmits(["remove"]);

/**
 * Handle moving fish
 */
const fishDOMEl = ref();
const aquariumEl = ref();

const position = ref({
  x: 0,
  y: 0,
});
const minMilliseconds = 4000;
const maxMilliseconds = 10_000;
const generateTimeout = () =>
  Math.floor(Math.random() * maxMilliseconds) + minMilliseconds;
const timeout = ref(0);
const transition = computed(() => `all ${timeout.value / 1000}s linear`);

function doTimeout() {
  timeout.value = generateTimeout();
  setTimeout(() => {
    moveFish();
    doTimeout();
  }, timeout.value);
}

function moveFish() {
  directionRight.value = !directionRight.value;
  position.value = {
    x: generateXPosition(),
    y: generateYPosition(),
  };
}

function generateXPosition() {
  const x =
    Math.random() * aquariumEl.value.offsetWidth - fishDOMEl.value.clientWidth;
  const xPadded = x < 0 ? 0 : x;
  if (position.value.x === 0) return xPadded;

  if (
    // only move in the opposite direction
    directionRight.value &&
    xPadded > position.value.x &&
    // and move at least 200 pixels horizontally
    xPadded + 200 > position.value.x
  ) {
    return xPadded;
  } else if (
    // only move in the opposite direction
    !directionRight.value &&
    xPadded < position.value.x &&
    // and move at least 200 pixels horizontally
    xPadded - 200 < position.value.x
  ) {
    return xPadded;
  } else {
    return generateXPosition();
  }
}

function generateYPosition() {
  const y =
    Math.random() * aquariumEl.value.offsetHeight -
    fishDOMEl.value.clientHeight;
  const yPadded = y < 0 ? 0 : y;

  // move this fish at least 200 pixels vertically
  if (yPadded > position.value.y && yPadded + 200 > position.value.y) {
    return yPadded;
  } else if (yPadded < position.value.y && yPadded - 200 < position.value.y) {
    return yPadded;
  } else {
    return generateYPosition();
  }
}

onMounted(() => {
  aquariumEl.value = document.querySelector("#aquarium");

  moveFish();
  setTimeout(() => {
    moveFish();
    doTimeout();
  }, 2);
});

const directionRight = ref(generateDirection());
function generateDirection() {
  return Math.random() > 0.5;
}

/**
 * Handle fish hunger
 */
const hunger = ref(0);
const isHungry = ref(false);
const isDead = ref(false);

// Increment hunger every second
setInterval(() => {
  if (hunger.value < 100) {
    hunger.value++;
    isHungry.value = hunger.value >= 70;
  } else {
    isHungry.value = false;
    isDead.value = true;
    setTimeout(() => {
      emit("remove");
    }, 5_000);
  }
}, 100);

function feedFish() {
  hunger.value = 0; // Reset hunger level when fish is fed
}

const size = computed(() => {
  const random = Math.random();
  if (random <= 0.2) {
    return "w-16";
  } else if (random <= 0.5) {
    return "w-24";
  } else if (random >= 0.9) {
    return "w-48";
  }
  return "w-32";
});
</script>

<template>
  <div
    class="text-center fish"
    :style="{
      left: `${position.x}px`,
      top: `${position.y}px`,
      transition: timeout ? transition : false,
    }"
    ref="fishDOMEl"
  >
    <img
      key="fish"
      :src="`/${isDead ? 'dead' : type}.png`"
      :alt="name"
      class="inline-block"
      :class="size"
      :style="{
        transition: `all ${1.1 - timeout / maxMilliseconds}s ease`,
        transform: `scaleX(${directionRight ? 1 : -1})`,
      }"
    />
    <br />
    <div
      class="mt-2 text-center text-white bg-[rgba(0,0,0,.6)] p-2 rounded inline relative overflow-hidden"
    >
      {{ name }}
      <div
        :class="{
          'bg-green-600': hunger < 30,
          'bg-yellow-600': hunger >= 30 && hunger < 70,
          'bg-red-600': hunger >= 70,
        }"
        class="absolute bottom-0 left-0 w-full h-1"
        :style="{ width: (hunger / 100) * 100 + '%' }"
      ></div>
    </div>

    <button
      v-if="isHungry"
      @click="feedFish"
      style="transform: translateX(-50%)"
      class="speech-bubble"
    >
      Feed Me <span class="font-bold text-red-600">!</span>
    </button>
  </div>
</template>

<style scoped>
.fish {
  position: absolute;
}

.speech-bubble {
  @apply absolute bottom-[100%] px-4 py-2 rounded-full left-[50%] whitespace-nowrap;
  background: rgba(255, 255, 255, 0.9);
}
.speech-bubble::before {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 10px;
  border-color: transparent rgba(255, 255, 255, 0.9) transparent transparent;
  top: 99%;
  left: 50%;
  transform: translateX(-50%) rotate(-90deg);
}
</style>
