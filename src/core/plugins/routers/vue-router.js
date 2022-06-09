const MainView = () => import('@views/main/MainView.vue')
const CharactersView = () => import('@views/characters/CharactersView.vue')

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: "MainView",
        component: MainView
    }
    ,
    {
        path: '/characters',
        name: "CharactersView",
        component: CharactersView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router