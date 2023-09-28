<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({ fish: Object, ah: Number, aw: Number });
onMounted(() => {
    moveFish();
    moveFish();
    setInterval(moveFish, 6000);
});
const moveFish = () => {
    if (props.fish.health) {
        let x = Math.floor(Math.random() * props.aw);
        let y = Math.floor(Math.random() * props.ah);
        if (fishCard.value) {
            fishCard.value.style.transform = `translate(${x}px, ${y}px)`;
        }
    }
};
const needFood = computed(() => {
    return props.fish.health < 5 && props.fish.health > 0;
});

const fishImage = computed(() =>
    props.fish.health ? `/${props.fish.type}.png` : '/dead.png'
);
const fishCard = ref(null);

const dinamicWidth = computed(() => {
    return props.fish.health;
});
</script>

<template>
    <div class="w-20 fish cursor-pointer" ref="fishCard">
        <div class="feed rounded" v-if="needFood">Feed Me!</div>
        <img :src="fishImage" />
        <div class="fish-name">{{ fish.name }}</div>
        <div class="life-line" :style="{ width: dinamicWidth + '%' }"></div>
    </div>
</template>

<style scoped>
.feed {
    padding: 0.2rem;
    text-align: center;
    background-color: aliceblue;
    border: 1px solid;
}
.fish {
    transition: transform 10s ease-in-out;
}
.life-line {
    height: 2px;
    background-color: red;
}
</style>
