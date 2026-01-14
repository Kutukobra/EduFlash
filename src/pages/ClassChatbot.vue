<script setup>
import Header from "@/components/Header.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const route = useRoute();

const roomId = route.params.roomId;
const roomName = ref("");

function getRoomData() {
  axios
    .get(`/room/${roomId}`)
    .then((response) => {
      roomName.value = response.data.data.room_name;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  getRoomData();
});

const messages = ref([
  {
    sent: true,
    text: "Assalamualaikum habibie",
  },
]);

const message = ref("message")

function sendMessage() {
  console.log(message.value)
  messages.value.push({
    sent: true,
    text: message.value
  })
  message.value = ""
}

</script>

<template>
  <Header />
  <div class="wrapper">
    <main>
      <h1>{{ roomName }}</h1>
      <section class="chatbot">
        <h2>Chat</h2>
        <div class="chatbox">
          <div
            v-for="message in messages"
            :class="
              'chat-bubble ' + (message.sent ? ' chat-sent' : ' chat-received')
            "
          >
            {{ message.text }}
          </div>
        </div>
        <form @submit.prevent="sendMessage">
          <input type="text" placeholder="Masukkan pertanyaan kamu" v-model="message"/>
        </form>
      </section>
      <section class="options"></section>
    </main>
  </div>
</template>

<style scoped>
.chatbox {
  position: relative;
  overflow-y: scroll;
  width: 100%;
  height: 80%;
  padding: 1rem;
}

.chat-bubble {
  color: black;
  max-width: 50%;
  padding: 1rem;
  position: relative;
  border: 0;
  border-radius: 14px;
  margin: 0.5rem;
}

.chat-sent {
  background-color: #c5e9ff;
  left: 50%;
}

.chat-received {
  color: white;
  background-color: #016493;
}

form {
  box-sizing: border-box;
  height: 10%;
  bottom: 0px;
}

input {
  box-sizing: border-box;
  padding: 1rem;
  margin-bottom: 0px;
  width: 100%;
  height: 100%;
  border: 1px solid #016493;
  border-radius: 14px;
  color: #016493;
  font-size: 1.4rem;
}

input::placeholder {
  color: #016493;
}

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
  height: 10%;
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
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr 20fr;
  grid-template-areas:
    "title ."
    "transcript options";
  gap: 2rem;
}

.chatbot {
  grid-area: transcript;
  border: 1px solid #016493;
  border-radius: 15px;

  overflow: hidden;
}

.options {
  grid-area: options;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ededed;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}
</style>
