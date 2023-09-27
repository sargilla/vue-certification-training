<script setup>
import { ref, computed } from "vue";

const player = ref("X");
const board = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);

const checkRowForSame = (row) => {
  if (row.filter((i) => i !== "").length) {
    const threeInRow = row.every((i) => i === row[0]);
    if (threeInRow) return row[0];
  }
  return false;
};

const threeInRowHorizontally = computed(() => {
  for (let i = 0; i < board.value.length; i++) {
    if (checkRowForSame(board.value[i])) {
      return board.value[i][0];
    }
  }
  return false;
});

const threeInRowVertically = computed(() => {
  const columns = board.value.reduce(
    (result, row) =>
      row.map((value, index) => (result[index] || []).concat(value)),
    []
  );
  for (let i = 0; i < columns.length; i++) {
    if (checkRowForSame(columns[i])) {
      return columns[i][0];
    }
  }
  return false;
});

const threeInRowDiagonally = computed(() => {
  const leftToRight = checkRowForSame([
    board.value[0][0],
    board.value[1][1],
    board.value[2][2],
  ]);
  if (leftToRight) return leftToRight;

  const righToLeft = checkRowForSame([
    board.value[0][2],
    board.value[1][1],
    board.value[2][0],
  ]);

  if (righToLeft) return righToLeft;

  return false;
});

const winner = computed(() => {
  return (
    threeInRowHorizontally.value ||
    threeInRowVertically.value ||
    threeInRowDiagonally.value ||
    null
  );
});

const move = (x, y) => {
  if (winner.value || board.value[x][y] !== "") return;
  board.value[x][y] = player.value;
  player.value = player.value === "X" ? "O" : "X";
};

const reset = () => {
  board.value = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player.value = "X";
};

const isTie = computed(() => {
  return !board.value.flat().includes("") && !winner.value;
});

const isOver = computed(() => {
  return winner.value || isTie.value;
});
</script>

<template>
  <main class="h-screen pt-16 text-center dark:bg-gray-800 dark:text-white">
    <h1 class="mb-3 text-3xl font-bold">Tic-Tac-Toe</h1>

    <h3 v-if="!isOver" class="mb-4 text-xl">Player {{ player }}'s turn</h3>
    <div v-else>
      <h3 v-if="winner" class="mb-8 text-6xl font-bold">
        Player '{{ winner }}' wins!``
      </h3>
      <h3 v-if="isTie" class="mb-8 text-6xl font-bold">Cat Got It!</h3>
      <button
        @click="reset"
        class="inline-block p-3 px-2 mb-8 bg-blue-700 rounded"
      >
        New Game
      </button>
    </div>

    <div class="flex flex-col items-center mb-8">
      <div v-for="(row, x) in board" :key="x" class="flex">
        <button
          v-for="(cell, y) in row"
          :key="y"
          @click="move(x, y)"
          class="flex items-center justify-center w-24 h-24 text-5xl border border-white cursor-pointer"
          :class="{
            'text-lime-600': cell === 'X',
            'text-orange-500': cell === 'O',
          }"
        >
          {{ cell }}
        </button>
      </div>
    </div>
  </main>
</template>
