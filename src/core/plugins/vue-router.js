const MainView = () => import('@views/main/MainView.vue')
const Bar = { template: '<div>bar</div>' }

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: "MainView",
        component: MainView
    }
    ,
    {
        path: '/about',
        name: "About",
        component: Bar
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router