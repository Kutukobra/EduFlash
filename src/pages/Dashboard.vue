<script setup>
import CreateRoom from "@/components/CreateRoom.vue";
import Header from "@/components/Header.vue";
import Popup from "@/components/Popup.vue";
import router from "@/router";
import axios from "axios";
import { onMounted, ref } from "vue";

const username = ref("");
const userId = ref("");

const rooms = ref({});

function fetchRooms() {
  axios
    .get(`/user/${userId.value}/rooms`)
    .then((response) => {
      rooms.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  username.value = localStorage.getItem("username");
  userId.value = localStorage.getItem("user_id");
  fetchRooms();
});

function enterRoom(roomId) {
  router.push("/room/" + roomId + "/manage");
}

const creatingRoom = ref(false);
</script>

<template>
  <Header />
  <main>
    <h1>Mulai kelas hari ini, {{ username }}</h1>
    <section>
      <h2>Kelas Anda</h2>
      <div id="class-grid">
        <div id="new-class" @click="creatingRoom = true">
          <h4>+</h4>
          <span>Buat Kelas Baru</span>
        </div>
        <div
          class="room-card"
          v-for="room in rooms"
          :key="room.roomId"
          @click="enterRoom(room.id)"
        >
          <div class="room-card-top">
            <h3>{{ room.room_name }}</h3>
          </div>
          <div class="room-card-bottom">
            <span>Kode Kelas: {{ room.id }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Popup v-if="creatingRoom" @close-popup="creatingRoom = false">
    <CreateRoom
      @room-created="
        fetchRooms();
        creatingRoom = false;
      "
    />
  </Popup>
</template>

<style scoped>
#new-class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #016493;
  background-color: #f2fdff;
}

#new-class h4 {
  font-size: 5rem;
}

#new-class span {
  font-size: 1.2rem;
  margin-top: 1rem;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #016493;
  font-size: 2.4rem;
  margin-bottom: 4rem;
  margin-top: 2rem;
}

h2 {
  color: #016493;
  margin-bottom: 2rem;
}

section {
  position: relative;
  width: 60%;
  height: 50%;
  padding-bottom: 2rem;
}

#class-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3.2rem;
}

#new-class,
.room-card {
  box-sizing: border-box;
  border: 1px solid #4176c5;
  border-radius: 8px;
  background: white;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4 / 3;
}

h3 {
  position: relative;
  top: 40%;
  left: 5%;
  color: white;
}

.room-card-top {
  box-sizing: border-box;
  width: 100%;
  height: 55%;
  margin: 0px;
  background-color: #4176c5;
}

.room-card-bottom {
  width: 100%;
  height: 45%;
}

.room-card-bottom span {
  position: relative;
  left: 5%;
  top: 40%;
  font-size: 1rem;
}

#new-class {
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
