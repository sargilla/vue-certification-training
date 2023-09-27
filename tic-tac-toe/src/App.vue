<script setup>
import { reactive, ref, watch } from 'vue';

const turn = ref('x');
const wins = ref(false);

const board = reactive({
    r0: {
        c0: null,
        c1: null,
        c2: null,
    },
    r1: {
        c0: null,
        c1: null,
        c2: null,
    },
    r2: {
        c0: null,
        c1: null,
        c2: null,
    },
});

const evaluateBoard = () => {
    let c0 = [];
    let c1 = [];
    let c2 = [];

    Object.values(board).forEach((r) => {
        // check rows
        if (
            Object.values(r).every((v) => v === 'x') ||
            Object.values(r).every((v) => v === 'o')
        ) {
            wins.value = 'true';
        }

        if (r.c0) {
            c0.push(r.c0);
        }
        if (r.c1) {
            c1.push(r.c1);
        }
        if (r.c2) {
            c2.push(r.c2);
        }
    });
    if (
        c1.length == 3 &&
        (c1.every((v) => v === 'x') || c1.every((v) => v === 'o'))
    ) {
        wins.value = true;
    }
    if (
        c0.length == 3 &&
        (c0.every((v) => v === 'x') || c0.every((v) => v === 'o'))
    ) {
        wins.value = true;
    }
    if (
        c2.length == 3 &&
        (c2.every((v) => v === 'x') || c2.every((v) => v === 'o'))
    ) {
        wins.value = true;
    }
};
watch(board, (b) => {
    let diagonal1 = [b.r0.c0, b.r1.c1, b.r2.c2];
    let diagonal2 = [b.r0.c2, b.r1.c1, b.r2.c0];
    if (
        diagonal1.every((v) => v === 'x') ||
        diagonal1.every((v) => v === 'o')
    ) {
        wins.value = true;
    }
    if (
        diagonal2.every((v) => v === 'x') ||
        diagonal1.every((v) => v === 'o')
    ) {
        wins.value = true;
    }
});
const onBoardClick = (player, r, c) => {
    if (wins.value) return;
    if (!board[`r${r}`][`c${c}`]) {
        board[`r${r}`][`c${c}`] = player;
        evaluateBoard();
        if (!wins.value) {
            turn.value = turn.value == 'x' ? 'o' : 'x';
        }
    }
};
const resetBoard = () => {
    Object.keys(board).forEach((r) => {
        Object.keys(board[r]).forEach((c) => (board[r][c] = null));
    });
    wins.value = false;
};
</script>
<template>
    <div class="h-screen grid place-items-center">
        <div>
            <h3 class="text-2xl text-center">Tic Tac Toe</h3>
            <h2 class="text-xl text-center" v-if="wins">
                {{ `Player ${turn.toUpperCase()} Wins!` }}
            </h2>
            <h2 class="text-md text-center" v-else>
                {{ `Player ${turn.toUpperCase()}'s turn` }}
            </h2>
            <div class="text-center mt-2">
                <button class="button-primary" @click="resetBoard" v-if="wins">
                    New Game!
                </button>
            </div>
            <div class="grid grid-cols-3 board">
                <button
                    :class="[board.r0.c0 == 'x' ? 'red' : 'green']"
                    @click="onBoardClick(turn, 0, 0)"
                >
                    {{ board.r0.c0?.toUpperCase() }}
                </button>
                <button
                    :class="[board.r0.c1 == 'x' ? 'red' : 'green']"
                    @click="onBoardClick(turn, 0, 1)"
                >
                    {{ board.r0.c1?.toUpperCase() }}
                </button>
                <button
                    :class="[board.r0.c2 == 'x' ? 'red' : 'green']"
                    @click="onBoardClick(turn, 0, 2)"
                >
                    {{ board.r0.c2?.toUpperCase() }}
                </button>
                <button
                    :class="[board.r1.c0 == 'x' ? 'red' : 'green']"
                    @click="onBoardClick(turn, 1, 0)"
                >
                    {{ board.r1.c0?.toUpperCase() }}
                </button>
                <button
                    :class="[board.r1.c1 == 'x' ? 'red' : 'green']"
                    @click="onBoardClick(turn, 1, 1)"
                >
                    {{ board.r1.c1?.toUpperCase() }}
                </button>
                <button
                    :class="[board.r1.c2 == 'x' ? 'red' : 'green']"
                    @click="onBoardClick(turn, 1, 2)"
                >
                    {{ board.r1.c2?.toUpperCase() }}
                </button>
                <button
                    :class="[board.r2.c0 == 'x' ? 'red' : 'green']"
                    @click="onBoardClick(turn, 2, 0)"
                >
                    {{ board.r2.c0?.toUpperCase() }}
                </button>
                <button
                    :class="[board.r2.c1 == 'x' ? 'red' : 'green']"
                    @click="onBoardClick(turn, 2, 1)"
                >
                    {{ board.r2.c1?.toUpperCase() }}
                </button>
                <button
                    :class="[board.r2.c2 == 'x' ? 'red' : 'green']"
                    @click="onBoardClick(turn, 2, 2)"
                >
                    {{ board.r2.c2?.toUpperCase() }}
                </button>
            </div>
        </div>
    </div>
</template>
