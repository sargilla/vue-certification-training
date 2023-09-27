<script setup>
import { computed, reactive, ref } from 'vue';

const result = ref(null);
const operation = ref(null);
const value1 = ref(null);
const value2 = ref(null);
const screen = computed(() => {
    if (!result.value && !value1.value && !value2.value && !operation.value) {
        return 0;
    }
    return (
        result.value ??
        `${value1.value ?? ''} ${operation.value ?? ''} ${value2.value ?? ''}`
    );
});
const addToValue = (value) => {
    if (!operation.value) {
        if (!value1.value) {
            value1.value = value;
        } else {
            value1.value += value;
        }
    } else {
        if (!value2.value) {
            value2.value = value;
        } else {
            value2.value += value;
        }
    }
};
const addOperation = (op) => {
    if (value1.value && !value2.value) operation.value = op;
};

const calculateOperation = () => {
    let n1 = Number(value1.value);
    let n2 = Number(value2.value);
    switch (operation.value) {
        case '+':
            result.value = n1 + n2;
            break;
        case '-':
            result.value = n1 - n2;
            break;
        case '/':
            result.value = n1 / n2;
            break;
        case 'x':
            result.value = n1 * n2;
            break;
        default:
            result.value = 'Operation Fail';
            break;
    }
};
const inputValue = (value) => {
    switch (value) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            addToValue(value);
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
            addOperation(value);
            break;
        case '=':
            calculateOperation();
        default:
            break;
    }
};
const resetOperation = () => {
    value1.value = null;
    operation.value = null;
    value2.value = null;
    result.value = null;
};
</script>
<template>
    <div class="h-screen grid place-items-center">
        <div class="rounded bg-gray-400 p-3">
            <div class="screen">{{ screen }}</div>
            <div class="keyboard">
                <button @click="resetOperation">C</button>
                <div></div>
                <div></div>
                <button @click="inputValue('/')">/</button>
                <button @click="inputValue('7')">7</button>
                <button @click="inputValue('8')">8</button>
                <button @click="inputValue('9')">9</button>
                <button @click="inputValue('x')">x</button>
                <button @click="inputValue('4')">4</button>
                <button @click="inputValue('5')">5</button>
                <button @click="inputValue('6')">6</button>
                <button @click="inputValue('-')">-</button>
                <button @click="inputValue('1')">1</button>
                <button @click="inputValue('2')">2</button>
                <button @click="inputValue('3')">3</button>
                <button @click="inputValue('+')">+</button>
                <button @click="inputValue('0')">0</button>
                <div></div>
                <button @click="inputValue('.')">.</button>
                <button @click="inputValue('=')">=</button>
            </div>
        </div>
    </div>
</template>
