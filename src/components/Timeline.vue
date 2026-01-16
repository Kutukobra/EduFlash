<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { connectWebSocket } from "@/services/websocketService";

const props = defineProps({
  roomId: {
    type: String,
    required: true,
  },
});

const events = ref([]);
const selectedEvent = ref(null);
let wsConnection = null;

const sortedEvents = computed(() => {
  return [...events.value].sort((a, b) => b.timestamp - a.timestamp);
});

function handleWebSocketMessage(data) {
  const event = {
    id: Date.now(),
    type: data.type,
    content: data.content,
    timestamp: data.timestamp || Date.now(),
  };
  
  events.value.push(event);
}

function selectEvent(event) {
  selectedEvent.value = event;
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("id-ID");
}

onMounted(() => {
  wsConnection = connectWebSocket(props.roomId, handleWebSocketMessage);
});

onUnmounted(() => {
  if (wsConnection) {
    wsConnection.close();
  }
});
</script>

<template>
  <div class="timeline-container">
    <h2>Timeline Kelas</h2>
    <div class="timeline">
      <div v-if="sortedEvents.length === 0" class="empty-state">
        Belum ada aktivitas di kelas ini
      </div>
      <div
        v-for="event in sortedEvents"
        :key="event.id"
        :class="['timeline-event', event.type, { selected: selectedEvent?.id === event.id }]"
        @click="selectEvent(event)"
      >
        <div class="event-time">{{ formatTime(event.timestamp) }}</div>
        <div class="event-content">
          <div v-if="event.type === 'text'" class="text-event">
            <span class="icon">📝</span>
            <p>{{ event.content }}</p>
          </div>
          <div v-else-if="event.type === 'image'" class="image-event">
            <span class="icon">📷</span>
            <img :src="'data:image/jpeg;base64,' + event.content" alt="Snapshot" />
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="selectedEvent" class="event-detail">
      <h3>Detail</h3>
      <button @click="selectedEvent = null" class="close-btn">✕</button>
      <div class="detail-content">
        <p class="detail-time">{{ formatTime(selectedEvent.timestamp) }}</p>
        <div v-if="selectedEvent.type === 'text'" class="text-detail">
          {{ selectedEvent.content }}
        </div>
        <div v-else-if="selectedEvent.type === 'image'" class="image-detail">
          <img :src="'data:image/jpeg;base64,' + selectedEvent.content" alt="Full view" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

h2 {
  color: #016493;
  padding: 1rem;
  margin: 0;
  border-bottom: 2px solid #016493;
}

.timeline {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 3rem;
  font-size: 1.1rem;
}

.timeline-event {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.timeline-event:hover {
  border-color: #016493;
  box-shadow: 0 2px 8px rgba(1, 100, 147, 0.1);
}

.timeline-event.selected {
  border-color: #016493;
  background: #f0f8ff;
}

.event-time {
  color: #016493;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.event-content {
  color: #333;
}

.text-event {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.text-event .icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.text-event p {
  margin: 0;
  line-height: 1.5;
}

.image-event {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.image-event .icon {
  font-size: 1.2rem;
}

.image-event img {
  max-width: 200px;
  max-height: 150px;
  border-radius: 4px;
  object-fit: cover;
}

.event-detail {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid #016493;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.event-detail h3 {
  color: #016493;
  margin-top: 0;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #333;
}

.detail-time {
  color: #016493;
  font-weight: 600;
  margin-bottom: 1rem;
}

.text-detail {
  color: #333;
  line-height: 1.6;
  font-size: 1.1rem;
}

.image-detail img {
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 8px;
}
</style>
