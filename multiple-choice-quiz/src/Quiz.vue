<script setup>
import { computed, onMounted, ref } from 'vue';

const questions = [
    {
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Rome'],
        answer: 'Paris',
    },
    {
        question: 'Which planet is closest to the sun?',
        options: ['Earth', 'Mars', 'Venus', 'Mercury'],
        answer: 'Mercury',
    },
    // Add more questions as needed
];

const currentQuestionIndex = ref(0);
const currentQuestion = ref(null);
const currentQuestionResponse = ref(null);
const currentQuestionMessage = ref(null);
const successResponses = ref(0);
const isCorrectAnswer = computed(() => {
    // console.log(currentQuestion.value?.answer, currentQuestionResponse.value);
    return currentQuestion.value?.answer == currentQuestionResponse.value;
});
onMounted(() => {
    currentQuestion.value = questions[0];
});

const evaluateQuestion = () => {
    if (!currentQuestionResponse.value) return;
    if (isCorrectAnswer.value) {
        successResponses.value++;
        currentQuestionMessage.value = 'Correct!';
    } else {
        currentQuestionMessage.value = 'Incorrect!';
    }
};

const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.length - 1) {
        currentQuestionIndex.value++;
        currentQuestion.value = questions[currentQuestionIndex.value];
        currentQuestionMessage.value = null;
        currentQuestionResponse.value = null;
    } else {
        endQuiz.value = true;
    }
};
const endQuiz = ref(false);
</script>
<template>
    <div class="h-screen grid place-items-center text-white">
        <div v-if="endQuiz">
            <h1>
                You final score: {{ successResponses }} out of
                {{ questions.length }}
            </h1>
        </div>
        <div v-else class="min-w-[300px]">
            <h1
                class="text-center text-2xl font-bold p-3 border-b-2 border-b-white-500"
            >
                {{ currentQuestion?.question }}
            </h1>
            <ul class="pl-5 my-4">
                <li
                    v-for="(option, index) in currentQuestion?.options"
                    :key="index"
                    class="p-2"
                >
                    <input
                        type="radio"
                        :id="`op${index}`"
                        :value="option"
                        v-model="currentQuestionResponse"
                        :disabled="currentQuestionMessage"
                    />
                    <label :for="`op${index}`" class="pl-3">{{ option }}</label>
                </li>
            </ul>
            <div class="flex">
                <div class="w-4/5 text-center">
                    <span
                        class="w-100 h-30 block mr-2"
                        v-if="currentQuestionMessage"
                        :class="[isCorrectAnswer ? 'success' : 'error']"
                    >
                        {{ currentQuestionMessage }}
                    </span>
                </div>
                <button
                    class="w-1/5 px-2 py-1 bg-blue-600 hover:bg-blue-500"
                    @click="nextQuestion"
                    v-if="currentQuestionMessage"
                >
                    Next
                </button>
                <button
                    class="w-1/5 px-2 py-1 bg-blue-600 hover:bg-blue-500"
                    @click="evaluateQuestion"
                    v-else
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.success {
    @apply bg-green-400 border-4 border-green-900 text-green-200;
}
.error {
    @apply bg-red-400 border-2 border-red-900 text-red-200;
}
</style>
