<script setup>
import { ref, defineModel } from "vue";
import axios, { HttpStatusCode } from "axios";
import router from "@/router";
import EduFlashLogo from "@/components/EduFlashLogo.vue";

const name = defineModel("name");
const roomId = defineModel("roomId");

const invalidRoom = ref(false);

function submitJoinRoom() {
  axios
    .post(`/room/${roomId.value}/join`, null, {
      params: {
        studentName: name.value,
      },
    })
    .then((response) => {
      if (response.status == HttpStatusCode.Ok) {
        console.log("Successfully joined room");
        sessionStorage.setItem("room_id", roomId.value);
        sessionStorage.setItem("username", name.value);

        router.push("/room")
      } else {
        console.log("Failed to join room");
        invalidRoom.value = true;
      }
    })
    .catch(() => {
      console.log("Failed to join room");
      invalidRoom.value = true;
    });
}
</script>

<template>
  <EduFlashLogo />
  <div id="wrapper">
    <main>
      <form @submit.prevent="submitJoinRoom">
        <h2>Masukkan Kode Kelas</h2>
        <label>Nama</label>
        <input type="text" placeholder="Masukkan nama Anda" v-model="name" />
        <label>Kode Kelas</label>
        <input
          type="text"
          placeholder="Masukkan kode latihan soal"
          maxlength="6"
          v-model="roomId"
        />
        <input type="submit" value="Masuk Kelas" />

        <label v-if="invalidRoom == true" id="invalid-room">Invalid Room</label>
      </form>
    </main>
  </div>
</template>

<style scoped>
@import url(../assets/entrypage.css);
#invalid-room {
  color: red;
}
</style>
