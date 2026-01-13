<script setup>
import Header from "@/components/Header.vue";
import { ref, defineModel } from "vue";
import axios, { HttpStatusCode } from "axios";
import Navbar from "@/components/Navbar.vue";

const name = defineModel("name");
const roomId = defineModel("roomId");

const invalidRoom = ref(false);

function submitJoinRoom() {
  axios
    .get("/room/join", {
      params: {
        roomId: roomId.value,
      },
    })
    .then((response) => {
      if (response.status == HttpStatusCode.Ok) {
        console.log("Successfully joined room");
        sessionStorage.setItem("room_id", roomId.value);
        sessionStorage.setItem("username", name.value);
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
      
    </main>
    <Navbar />
  </div>
</template>

<style scoped>
#join-wrapper {
  width: 100%;
}

main {
  width: 50%;
}

#navbar {
  width: 20%;
}
</style>
