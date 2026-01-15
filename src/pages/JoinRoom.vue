<script setup>
import { ref } from "vue";
import router from "@/router";
import EduFlashLogo from "@/components/EduFlashLogo.vue";
import axios from "axios";
import { setStudentData } from "@/storage/student";

const name = ref("");
const roomId = ref("");

const invalidRoom = ref(false);

const errorMessage = ref("Ada yang salah");

function submitJoinRoom() {
  axios
    .post(`/room/${roomId.value}/join`, null, {
      params: {
        studentName: name.value,
      },
    })
    .then((response) => {
      let room = response.data.room;
      setStudentData(name.value, room.id, room.name);
      router.push("/room/" + roomId.value);
    })
    .catch((error) => {
      errorMessage.value = error.response.data.error;
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

        <label v-if="invalidRoom == true" id="error-request">{{
          errorMessage
        }}</label>
      </form>
    </main>
  </div>
</template>

<style scoped>
@import url(../assets/entrypage.css);
#error-request {
  color: red;
}
</style>
