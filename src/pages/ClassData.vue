<script setup>
import Header from "@/components/Header.vue";
import axios from "axios";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { connectWebSocket } from "@/services/websocketService";

const route = useRoute();

const roomId = route.params.roomId;
const roomName = ref("");
const transcript = ref([]);
const latestImage = ref(null);
const pollInterval = ref(null);
let wsConnection = null;

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

async function fetchTranscript() {
  try {
    const response = await axios.get(`http://localhost:3000/transcript/${roomId}`);
    if (response.data && response.data.transcript) {
      transcript.value = response.data.transcript.map(entry => ({
        text: entry.text,
        timestamp: new Date(entry.timestamp)
      }));
    }
  } catch (error) {
    console.error("Error fetching transcript:", error);
  }
}

onMounted(() => {
  getRoomData();
  fetchTranscript();
  
  // Connect to WebSocket for real-time updates
  wsConnection = connectWebSocket(roomId, handleWebSocketMessage);
  
  // Poll for transcript updates every 5 seconds
  pollInterval.value = setInterval(fetchTranscript, 5000);
});

onUnmounted(() => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value);
  }
  if (wsConnection) {
    wsConnection.close();
  }
});
</script>

<template>
  <Header />
  <div class="wrapper">
    <main>
      <h1>Rekaman Kelas {{ roomName }}</h1>
      <section class="recording">
        <img v-if="latestImage" :src="'data:image/jpeg;base64,' + latestImage" alt="Class recording" />
        <div v-else class="no-image">Menunggu gambar dari kelas...</div>
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
    </main>
  </div>
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

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

main {
  width: 80%;
  height: 80%;
  display: grid;
  grid-template-rows: 1fr 12fr 8fr;
  grid-template-areas:
    "title"
    "recording"
    "transcript";
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
  align-items: flex-start;
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
</style>
