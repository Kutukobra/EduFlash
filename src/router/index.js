import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/components/Login.vue'
import Landing from '@/components/Landing.vue'
import Register from '@/components/Register.vue'
import QuizPage from '@/components/QuizPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/landing', component: Landing },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/join', component: QuizPage },
  ],
})

export default router
