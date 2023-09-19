import '../style.css';

import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';

const HomePage = () => import('@/pages/HomePage.vue');
const MovieDetailPage = () => import('@/pages/MovieDetailPage.vue');

const routes = [
    { path: '/', component: HomePage },
    {
        path: '/detail/:id',
        component: MovieDetailPage,
        name: 'movie',
        props: (route) => ({ id: Number(route.params.id) }),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
const app = createApp(App);
app.use(router);
app.mount('#app');
