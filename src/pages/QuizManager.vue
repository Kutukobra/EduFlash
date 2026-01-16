<script setup>
import Header from "@/components/Header.vue";
import QuizReview from "@/components/QuizReview.vue";
import UserGroupIcon from "@/icons/UserGroupIcon.vue";
import PlayIcon from "@/icons/PlayIcon.vue";
import StopIcon from "@/icons/StopIcon.vue";
import { onMounted, ref } from "vue";
import Scoreboard from "@/components/Scoreboard.vue";
import axios from "axios";
import { useRoute } from "vue-router";

const questions = ref([]);

const route = useRoute();

const results = ref([]);

const distribute = ref(false);

function distributeQuiz() {
  distribute.value = true;
  postQuizToStudents();
}

function stopQuiz() {
  viewScores.value = true;
  distribute.value = false;
  getStudentScores();
}

const viewScores = ref(false);

function getStudentScores() {
  axios
    .get(`/quiz/${route.params.quizId}/scores`)
    .then((response) => {
      results.value = response.data.students;
    })
    .catch((error) => {
      console.log(error);
    });
}

function postQuizToStudents() {

}

function fetchQuiz() {
  axios
    .get(`/quiz/${route.params.quizId}`)
    .then((response) => {
      questions.value = response.data.quiz;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  fetchQuiz();
})
</script>

<template>
  <Header />
  <div class="wrapper">
    <main>
      <h1>Cek Kuis</h1>
      <Scoreboard v-if="viewScores" class="content" :results="results" />
      <QuizReview v-else class="content" :questions="questions" />
      <section class="options">
        <button
          v-if="distribute == false"
          id="start-btn"
          @click="distributeQuiz"
          class="option-card"
        >
          <PlayIcon />
          <h3>Mulai Latihan Soal</h3>
        </button>
        <button v-else id="stop-btn" @click="stopQuiz" class="option-card">
          <StopIcon />
          <h3>Berhenti</h3>
        </button>
        <div class="option-card" id="students">
          <div class="students-header">
            <UserGroupIcon />
            <h3>Kehadiran Kelas</h3>
          </div>
          <ol id="student-list">
            <!-- <li v-for="(student, index) in studentNames" :key="index">
              {{ student }}
            </li> -->
          </ol>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-content: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 80vh;
}

main {
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "header header"
    "content options";
  grid-template-columns: 9fr 2fr;
  grid-template-rows: 1fr 20fr;
  gap: 2rem;
}

h1 {
  grid-area: header;
  color: #016493;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  grid-area: content;
  overflow-y: auto;
  border: 0px;
  border-radius: 14px;
}

.options {
  grid-area: options;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ededed;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.option-card {
  color: white;
  width: 100%;
  min-height: 10%;
  background-color: #e9b03f;
  border: none;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-grow: 1;
  box-sizing: border-box;
}

#students > div {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  width: 100%;
}

#students {
  background-color: white;
  flex-grow: 8;
  border: 1px solid #e9b03f;
  border-radius: 14px;
  overflow: hidden;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
}

.students-header {
  color: white;
  background-color: #e9b03f;
  height: 15%;
}

#student-list {
  color: #e9b03f;
  list-style: decimal;
  margin: 0;
  overflow-y: scroll;
  flex-grow: 1;

  box-sizing: border-box;
  width: 100%;
  padding-top: 0.8rem;
}

#student-list li {
  color: #e9b03f;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  margin-left: 0.3rem;
}

#start-btn {
  background-color: #76c408;
}
#stop-btn {
  background-color: #c43408;
}

.icon {
  width: 20%;
  height: 80%;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
}

.icon svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
