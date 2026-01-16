<script setup>
import Header from "@/components/Header.vue";
import NoteIcon from "@/icons/NoteIcon.vue";
import PlayIcon from "@/icons/PlayIcon.vue";
import StopIcon from "@/icons/StopIcon.vue";
import UserGroupIcon from "@/icons/UserGroupIcon.vue";
import CreateQuiz from "@/components/CreateQuiz.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Popup from "@/components/Popup.vue";
import router from "@/router";

const route = useRoute();
const roomId = route.params.roomId;

const recording = ref(false);
function toggleRecording() {
  recording.value = !recording.value;
}

const studentNames = ref({});
const intervalId = ref({});
const roomName = ref("");

const newQuiz = ref("84a40060-4802-46b0-9cd8-4927341b202c");

function promptQuiz(prompt) {
  console.log(prompt);
  router.push(`/room/${route.params.roomId}/quiz/${newQuiz.value}/manage`);
}

function getRoomData() {
  axios
    .get(`/room/${roomId}`)
    .then((response) => {
      roomName.value = response.data.room.name;
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchStudents() {
  axios
    .get(`/room/${roomId}/students`)
    .then((response) => {
      studentNames.value = response.data.students;
    })
    .catch((error) => {
      console.log(error);
    });
}

function startStudentsPolling() {
  fetchStudents();
  if (intervalId.value) clearInterval(intervalId.value); // Clear any existing interval
  intervalId.value = setInterval(fetchStudents, 10000);
}

const creatingQuiz = ref(false);

onMounted(() => {
  startStudentsPolling();
  getRoomData();
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <Header />
  <div class="content-wrapper">
    <main>
      <h1>Rekaman Kelas {{ roomName }}</h1>
      <section class="recording">rekam</section>
      <section class="transcript">
        <h2>Transkrip Audio</h2>
        <div></div>
      </section>
      <section class="options">
        <div class="class-code option-card">
          <h3>Kode Kelas</h3>
          <span>{{ roomId }}</span>
        </div>
        <button
          v-if="recording == true"
          id="record-btn"
          @click="toggleRecording"
          class="option-card"
        >
          <PlayIcon />
          <h3>Rekam</h3>
        </button>
        <button
          v-else
          id="stop-btn"
          @click="toggleRecording"
          class="option-card"
        >
          <StopIcon />
          <h3>Berhenti</h3>
        </button>
        <div id="create-quiz" class="option-card" @click="creatingQuiz = true">
          <div>
            <NoteIcon />
            <h3>Buat Latihan Soal</h3>
          </div>
        </div>
        <div id="students" class="option-card">
          <div class="students-header">
            <UserGroupIcon />
            <h3>Kehadiran Kelas</h3>
          </div>

          <ol id="student-list">
            <li v-for="(student, index) in studentNames" :key="index">
              {{ student }}
            </li>
          </ol>
        </div>
      </section>
    </main>
  </div>
  <Popup v-if="creatingQuiz" @close-popup="creatingQuiz = false">
    <CreateQuiz @new-quiz="promptQuiz"/>
  </Popup>
</template>

<style scoped>
* {
  color: white;
  box-sizing: border-box;
}

h1 {
  color: #016493;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  width: 100%;
  height: 20%;
  background-color: #016493;
  display: flex;
  align-items: center;
  padding-left: 1.2rem;
  font-weight: 300;
}

h3 {
  font-size: 1rem;
  margin: 0;
  line-height: 1.2;
}

.content-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

main {
  width: 80%;
  height: 80%;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr 12fr 8fr;
  grid-template-areas:
    "title ."
    "recording options"
    "transcript options";
  gap: 2rem;
}

.recording {
  grid-area: recording;
  border: 1px solid #016493;
  border-radius: 15px;
}

.transcript {
  grid-area: transcript;
  border: 1px solid #016493;
  border-radius: 15px;

  overflow: hidden;
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
  width: 100%;
  min-height: 10%;
  background-color: #e9b03f;
  border: none;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#record-btn {
  background-color: #76c408;
}
#stop-btn {
  background-color: #c43408;
}

.class-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
}

.class-code span {
  font-size: 2.5rem;
  font-weight: 800;
}

#create-quiz > div,
#students > div {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  width: 100%;
}

#students {
  background-color: white;
  flex-grow: 1;
  border: 1px solid #e9b03f;
  border-radius: 14px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
}

.students-header {
  background-color: #e9b03f;
  height: 20%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  flex-shrink: 0;
}

#student-list {
  color: #e9b03f;
  list-style: decimal;
  margin: 0;
  color: #333;
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

#students > div {
  background-color: #e9b03f;
  height: 20%;
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
