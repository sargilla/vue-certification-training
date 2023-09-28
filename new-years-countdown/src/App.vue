<script setup>
import { onMounted, ref } from 'vue';

import CountdownHeader from '@/components/CountdownHeader.vue';
import CountdownSegment from '@/components/CountdownSegment.vue';

const countDownDate = () => {
    let leftTime = new Date('2024/01/01') - new Date().getTime();
    // console.log(leftTime / (1000 * 60 * 60 * 24));
    days.value = Math.floor(leftTime / (1000 * 60 * 60 * 24));
    hours.value = Math.floor(
        (leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    minutes.value = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((leftTime % (1000 * 60)) / 1000);
};

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
onMounted(() => {
    countDownDate();
    setInterval(countDownDate, 1000);
});
</script>
<template>
    <div class="app-wrapper">
        <div class="countdown-box">
            <CountdownHeader />
            <main class="flex justify-center">
                <CountdownSegment
                    data-test="days"
                    label="days"
                    :number="days"
                />
                <CountdownSegment
                    data-test="hours"
                    label="hours"
                    :number="hours"
                />
                <CountdownSegment
                    data-test="minutes"
                    label="minutes"
                    :number="minutes"
                />
                <CountdownSegment
                    data-test="seconds"
                    label="seconds"
                    :number="seconds"
                />
            </main>
        </div>
    </div>
</template>

<style scoped>
.app-wrapper {
    @apply flex items-center justify-center w-full h-full p-10;
}
.countdown-box {
    @apply shadow-md relative bg-white p-5 rounded-lg border-gray-100 border-[1px];
}
body {
    @apply bg-gray-100;
}
</style>
