<script setup>
import { getUserData } from "@/storage/teacher";
import axios from "axios";
import { ref, defineEmits } from "vue";

const roomName = ref("");
const emit = defineEmits(["room-created"]);

function submitCreateRoom() {
  let ownerId = getUserData().id
  axios
    .post("/room/create", {
      roomName: roomName.value,
      ownerId: ownerId,
    })
    .then(() => {
      emit("room-created");
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <div class="wrapper">
    <h1>Buat Kelas Baru</h1>
    <form @submit.prevent="submitCreateRoom">
      <label for="roomName">Nama Kelas</label>
      <input type="text" name="roomName" v-model="roomName" />
      <input type="submit" value="Buat Kelas" />
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  top: 15%;
}

h1 {
  color: #016493;
  padding: 0.5rem;
  text-align: center;
}

label {
  margin-top: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 80%;
  margin: 0 auto;
}

input[type="text"] {
  resize: none;
  border: 1px solid #cbd5e1;
  border-radius: 15px;
  padding: 2rem;
}

input[type="text"]::placeholder {
  color: #cbd5e1;
}

input[type="text"],
input[type="text"]::placeholder {
  font-size: 1.5rem;
}

input[type="submit"] {
  padding: 1rem;
  background-color: #016493;
  color: white;
  min-height: 2.5rem;
  border-radius: 15px;
  font-size: 1.3rem;
  border: none;
}

input[type="submit"]:hover {
  cursor: pointer;
}
</style>
