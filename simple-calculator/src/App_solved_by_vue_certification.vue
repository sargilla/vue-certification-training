<template>
  <div class="flex items-center justify-center h-screen w-screen">
    <div
      class="max-w-[400px] mx-auto text-center text-2xl p-8 border border-gray-400 rounded-md bg-gray-700"
    >
      <div class="h-20 w-full p-4 bg-green-900 rounded-md">
        <div class="text-4xl text-white text-right">
          {{ currentCalculation }}
        </div>
      </div>
      <div class="grid grid-cols-4 gap-3 w-full mt-12">
        <button
          v-for="button in buttons"
          :key="button.value"
          class="w-20 h-20 text-3xl rounded-2xl bg-gray-800 text-white hover:cursor-pointer hover:bg-blue-600"
          :class="{
            [button.classes]: true,
          }"
          :disabled="button.disabled"
          @click="handleClick(button.value)"
        >
          {{ button.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const currentCalculation = ref("");
const buttons = reactive([
  { label: "C", value: "clear", classes: "col-span-3" },
  { label: "÷", value: "/", classes: "" },
  { label: "7", value: "7", classes: "" },
  { label: "8", value: "8", classes: "" },
  { label: "9", value: "9", classes: "" },
  { label: "×", value: "*", classes: "" },
  { label: "4", value: "4", classes: "" },
  { label: "5", value: "5", classes: "" },
  { label: "6", value: "6", classes: "" },
  { label: "-", value: "-", classes: "" },
  { label: "1", value: "1", classes: "" },
  { label: "2", value: "2", classes: "" },
  { label: "3", value: "3", classes: "" },
  { label: "+", value: "+", classes: "" },
  { label: "0", value: "0", classes: "col-span-2" },
  { label: ".", value: ".", classes: "" },
  { label: "=", value: "equals", classes: "" },
]);

const handleClick = (value) => {
  switch (value) {
    case "clear":
      currentCalculation.value = "";
      break;
    case "equals":
      currentCalculation.value = eval(currentCalculation.value);
      break;
    default:
      currentCalculation.value += value;
      break;
  }
};
const handleKeyPress = (event) => {
  let keyValue =
    event.keyCode === 13 ? "=" : String.fromCharCode(event.keyCode);

  const button = Object.values(buttons).find(
    (button) => button.label.toLowerCase() === keyValue.toLowerCase()
  );

  if (button) {
    handleClick(button.value);
  }
};

onMounted(() => {
  window.addEventListener("keypress", handleKeyPress);
});

onBeforeUnmount(() => {
  window.removeEventListener("keypress", handleKeyPress);
});
</script>
