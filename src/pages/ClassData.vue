<script setup>
import Header from "@/components/Header.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const roomId = route.params.roomId;
const roomName = ref("");

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

onMounted(() => {
  getRoomData();
});
</script>

<template>
  <Header />
  <div class="wrapper">
    <main>
      <h1>Rekaman Kelas {{ roomName }}</h1>
      <section class="recording"></section>
      <section class="transcript">
        <h2>Transkrip Audio</h2>
        <div></div>
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
}

.transcript {
  grid-area: transcript;
  border: 1px solid #016493;
  border-radius: 15px;

  overflow: hidden;
}
</style>
