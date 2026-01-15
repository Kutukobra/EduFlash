<script setup>
import Header from "@/components/Header.vue";
import MovieIcon from "@/icons/MovieIcon.vue";
import { onMounted, ref } from "vue";
import HeadIcon from "./HeadIcon.vue";
import router from "@/router";
import { getStudentData } from "@/storage/student";

const roomId = ref("");
const roomName = ref("");

function toRoomData() {
  router.push(`/room/${roomId}/data`);
}

function toRoomChatbot() {
  router.push(`/room/${roomId}/chat`);
}

onMounted(() => {
  const student = getStudentData();
  roomId.value = student.roomId;
  roomName.value = student.roomName;
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
        <h2>Rekaman Vidio dan Audio</h2>
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
