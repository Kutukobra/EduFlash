<script setup>
import Header from "@/components/Header.vue";
import MovieIcon from "@/icons/MovieIcon.vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import HeadIcon from "./HeadIcon.vue";
import router from "@/router";
import { getStudentData } from "@/storage/student";
import axios from "axios";

const roomId = ref("");
const roomName = ref("");

function toRoomData() {
  router.push(`/room/${roomId.value}/data`);
}

function toRoomChatbot() {
  router.push(`/room/${roomId.value}/chat`);
}

const intervalId = ref({});
const latestId = ref("");

function newQuizReceived(quizId) {
  router.push("/quiz/" + quizId);
}

watch(latestId, (newId) => {
  if (!newId) return;
  if (newId == sessionStorage.getItem("latestQuiz")) return;
  sessionStorage.setItem("latestQuiz", newId);
  newQuizReceived(newId);
});

function fetchQuizzes() {
  axios
    .get(`/room/${roomId.value}/quizzes`)
    .then((response) => {
      if (response.data.quizzes) {
        latestId.value = response.data.quizzes[0];
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function startQuizPolling() {
  if (intervalId.value) clearInterval(intervalId.value); // Clear any existing interval
  intervalId.value = setInterval(fetchQuizzes, 5000);
}

onMounted(() => {
  const student = getStudentData();
  roomId.value = student.roomId;
  roomName.value = student.roomName;
  console.log(roomId.value);
  startQuizPolling();
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <Header :is-student="true" />
  <div class="wrapper">
    <main>
      <header>
        <h1>{{ roomName }}</h1>
        <span>ID: {{ roomId }}</span>
      </header>
      <div class="room-card" id="data-tab" @click="toRoomData">
        <MovieIcon />
        <h2>Rekaman Audio dan Foto</h2>
      </div>
      <div class="room-card" id="question-tab" @click="toRoomChatbot">
        <HeadIcon />
        <h2>Tanya Jawab dengan Edu</h2>
      </div>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
main {
  width: 50%;
  height: 70vh;
  display: grid;
  grid-template-areas:
    "header header "
    "data-tab question-tab";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 6fr;
  gap: 2rem;
  margin-top: 4rem;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: header;
}

h1 {
  color: #016493;
  font-size: 3rem;
  font-weight: bold;
  padding: 1rem;
}

span {
  color: #016493;
  font-weight: 400;
}

#data-tab {
  grid-area: data-tab;
  background-color: #016493;
}

#question-tab {
  grid-area: question-tab;
  background-color: #e9b03f;
}

.room-card {
  color: white;
  border: 0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
}

.icon {
  width: 40%;
}
</style>
