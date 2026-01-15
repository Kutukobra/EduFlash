import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import Landing from '@/pages/Landing.vue'
import Register from '@/pages/Register.vue'
import Room from '@/pages/Room.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Quiz from '@/pages/Quiz.vue'
import RoomManager from '@/pages/RoomManager.vue'
import JoinRoom from '@/pages/JoinRoom.vue'
import ClassData from '@/pages/ClassData.vue'
import ClassChatbot from '@/pages/ClassChatbot.vue'
import QuizManager from '@/pages/QuizManager.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Landing },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/join', component: JoinRoom },
    { path: '/room/:roomId', component: Room },
    { path: '/room/:roomId/data', component: ClassData },
    { path: '/room/:roomId/chat', component: ClassChatbot },
    { path: '/room/:roomId/manage', component: RoomManager },
    { path: '/dashboard', component: Dashboard },
    { path: '/quiz', component: Quiz },
    { path: '/quiz/:quizId/manage', component: QuizManager}
  ],
})

export default router
