<script setup>
import router from "@/router";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();

const quizId = "56442617-0b4d-401d-bd9f-b49e7231b2cd";
const prompt = ref("");

function promptQuiz() {
  console.log(prompt.value);
  router.push(`/room/${route.params.roomId}/quiz/${quizId}/manage`);
}
</script>

<template>
  <h1>Buat Latihan Soal</h1>
  <form @submit.prevent="promptQuiz">
    <textarea
      placeholder="Ketik perintah untuk membuat latihan soal" v-model="prompt"
    ></textarea>
    <input type="submit" value="Buat dan bagikan" />
  </form>
</template>

<style scoped>
h1 {
  color: #016493;
  padding: 0.5rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  height: 100%;
  margin: 0 auto;
}

textarea {
  resize: none;
  flex-grow: 3;
  border: 1px solid #cbd5e1;
  border-radius: 15px;
  padding: 2rem;
}

textarea::placeholder {
  color: #cbd5e1;
}

textarea,
textarea::placeholder {
  font-size: 1.2rem;
}

input[type="submit"] {
  flex-grow: 1;
  max-height: 20%;
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
