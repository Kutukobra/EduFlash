<script setup>
import Header from "@/components/Header.vue";
import { ref, defineModel } from "vue";
import axios, { HttpStatusCode } from "axios";
import router from "@/router";

const name = defineModel("name");
const roomId = defineModel("roomId");

const invalidRoom = ref(false);

function submitJoinRoom() {
  axios
    .post("/room/join", {
      params: {
        roomId: roomId.value,
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
  <Header />
  <div id="join-wrapper">
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
#join-wrapper {
  margin-top: 2rem;
  display: flex;
  height: 80vh;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
}

#invalid-room {
  color: red;
}

main {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: center;

  max-width: 75%;
}

main > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  color: #016493;
  font-size: 2.5rem;
  font-weight: 900;
}

input {
  box-sizing: border-box;

  position: relative;

  display: flex;

  align-items: center;

  width: 40rem;
  height: 6rem;

  margin-top: 1.5rem;
}

input {
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  border: 1px solid #016493;
  border-radius: 10px;
  padding: 1.2rem;

  font-size: 2rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

input::placeholder {
  position: relative;
  left: 1rem;
  font-size: 1.2rem;
  color: #016493;
}

button {
  position: absolute;

  right: 2%;

  height: 72%;

  border: 0px;
  border-radius: 15px;
  background-color: #016493;
  color: #ffffff;
  font-size: 1.5rem;
  padding: 1rem;
}

h3 {
  color: #e9b03f;
  font-size: 1.6rem;
  text-align: left;
  margin: 1rem;
  margin-left: 0;
  margin-top: 3.5rem;
}

#history-grid {
  display: grid;
  grid-template-columns: 49% 49%;
  gap: 2%;
  row-gap: 1.5rem;
  position: relative;
}

label {
  font-size: 1.5rem;
  position: relative;
  top: 1rem;
  color: #016493;
}
</style>
