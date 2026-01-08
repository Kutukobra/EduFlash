import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/components/Login.vue'
import Landing from '@/components/Landing.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login },
    { path: '/landing', component: Landing },
  ],
})

export default router
