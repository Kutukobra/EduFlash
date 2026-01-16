<script setup>
import Header from "@/components/Header.vue";
import NoteIcon from "@/icons/NoteIcon.vue";
import PlayIcon from "@/icons/PlayIcon.vue";
import StopIcon from "@/icons/StopIcon.vue";
import UserGroupIcon from "@/icons/UserGroupIcon.vue";
import CreateQuiz from "@/components/CreateQuiz.vue";
import DeviceControl from "@/components/DeviceControl.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Popup from "@/components/Popup.vue";
import router from "@/router";
import { generateQuiz } from "@/services/aiService";
import { connectWebSocket } from "@/services/websocketService";

const route = useRoute();
const roomId = route.params.roomId;

const recording = ref(false);
function toggleRecording() {
  if (!deviceProvisioned.value) {
    showDeviceControl.value = true;
  } else {
    recording.value = !recording.value;
    // TODO: Send recording control to device via WebSocket
  }
}

function handleDeviceProvisioned() {
  deviceProvisioned.value = true;
  recording.value = true;
  showDeviceControl.value = false;
}

const studentNames = ref({});
const intervalId = ref({});
const roomName = ref("");
const transcript = ref([]);
const latestImage = ref(null);
const generatingQuiz = ref(false);
const showDeviceControl = ref(false);
const deviceProvisioned = ref(false);

async function promptQuiz(prompt) {
  if (!prompt || generatingQuiz.value) return;
  
  generatingQuiz.value = true;
  try {
    const quizData = await generateQuiz(roomId, prompt);
    
    // Create quiz in backend
    const response = await axios.post("/quiz/create", {
      roomId: roomId,
      content: quizData.questions
    });
    
    const quizId = response.data.id;
    
    // Add quiz to room
    await axios.post(`/room/${roomId}/quiz`, {
      quizId: quizId
    });
    
    creatingQuiz.value = false;
    router.push(`/room/${roomId}/quiz/${quizId}/manage`);
  } catch (error) {
    console.error("Error generating quiz:", error);
    alert("Gagal membuat kuis. Silakan coba lagi.");
  } finally {
    generatingQuiz.value = false;
  }
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
let wsConnection = null;

function handleWebSocketMessage(data) {
  if (data.type === "transcript") {
    transcript.value.push({
      text: data.content,
      timestamp: new Date(data.timestamp)
    });
  } else if (data.type === "image") {
    latestImage.value = data.content;
  }
}

onMounted(() => {
  startStudentsPolling();
  getRoomData();
  
  // Connect to WebSocket for real-time updates
  wsConnection = connectWebSocket(roomId, handleWebSocketMessage);
});

onUnmounted(() => {
  clearInterval(intervalId.value);
  if (wsConnection) {
    wsConnection.close();
  }
});
</script>

<template>
  <Header />
  <div class="content-wrapper">
    <main>
      <h1>Rekaman Kelas {{ roomName }}</h1>
      <section class="recording">
        <img v-if="latestImage" :src="'data:image/jpeg;base64,' + latestImage" alt="Latest class snapshot" />
        <div v-else class="no-image">Tidak ada gambar</div>
      </section>
      <section class="transcript">
        <h2>Transkrip Audio</h2>
        <div class="transcript-content">
          <p v-if="transcript.length === 0" class="no-transcript">Belum ada transkrip...</p>
          <div v-for="(entry, index) in transcript" :key="index" class="transcript-entry">
            <span class="timestamp">{{ entry.timestamp.toLocaleTimeString() }}</span>
            <span class="text">{{ entry.text }}</span>
          </div>
        </div>
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
  <Popup v-if="showDeviceControl" @close-popup="showDeviceControl = false">
    <DeviceControl :room-id="roomId" @device-provisioned="handleDeviceProvisioned" />
  </Popup>

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
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f0f0f0;
}

.recording img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.no-image {
  color: #999;
  font-size: 1.2rem;
}

.transcript {
  grid-area: transcript;
  border: 1px solid #016493;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.transcript-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  color: #333;
}

.no-transcript {
  color: #999;
  text-align: center;
  padding: 2rem;
}

.transcript-entry {
  margin-bottom: 0.8rem;
  display: flex;
  gap: 1rem;
}

.transcript-entry .timestamp {
  color: #016493;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.transcript-entry .text {
  color: #333;
  line-height: 1.5;
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
