import { createRouter, createWebHistory } from "vue-router";

import Login from "@/pages/Login.vue";
import Landing from "@/pages/Landing.vue";
import Register from "@/pages/Register.vue";
import Room from "@/pages/Room.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Quiz from "@/pages/Quiz.vue";
import RoomManager from "@/pages/RoomManager.vue";
import JoinRoom from "@/pages/JoinRoom.vue";
import ClassData from "@/pages/ClassData.vue";
import ClassChatbot from "@/pages/ClassChatbot.vue";
import QuizManager from "@/pages/QuizManager.vue";
import { getStudentData } from "@/storage/student";
import { getUserData } from "@/storage/teacher";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Landing, name: "Landing" },
    { path: "/login", component: Login, name: "Login" },
    { path: "/register", component: Register, name: "Register" },
    { path: "/join", component: JoinRoom, name: "Join" },
    { path: "/dashboard", component: Dashboard },
    { path: "/room/:roomId", component: Room },
    { path: "/room/:roomId/data", component: ClassData },
    { path: "/room/:roomId/chat", component: ClassChatbot },
    { path: "/room/:roomId/manage", component: RoomManager },
    { path: "/quiz", component: Quiz },
    { path: "/quiz/:quizId/manage", component: QuizManager },
  ],
});

router.beforeEach((to) => {
  const publicPages = ["Landing", "Login", "Register", "Join"];

  const student = getStudentData();
  const user = getUserData();

  const isLoggedIn = !!student?.username || !!user?.id;

  if (!publicPages.includes(to.name) && !isLoggedIn) {
    return { name: "Landing" };
  }
});

export default router;
