import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import Landing from '@/pages/Landing.vue'
import Register from '@/pages/Register.vue'
import JoinQuiz from '@/pages/JoinQuiz.vue'
import Room from '@/pages/Room.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Quiz from '@/pages/Quiz.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/landing', component: Landing },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/join', component: JoinQuiz },
    { path: '/room', component: Room },
    { path: '/dashboard', component: Dashboard },
    { path: '/quiz', component: Quiz },
  ],
})

export default router
