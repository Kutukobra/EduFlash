<script setup>
import Header from "@/components/Header.vue";
import Question from "@/components/Question.vue";

const questions = [
  {
    id: 0,
    question: "Siapa nama lengkap Miko?",
    options: [
      { id: 0, text: "Mikoplastik." },
      { id: 1, text: "Mikoservis." },
      { id: 2, text: "Mikola Syabila" },
      { id: 3, text: "Mikosayang Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }, 
    ],
    answer: 2,
  },
  {
    id: 1,
    question: "Siapa nama lengkap Miko?",
    options: [
      { id: 0, text: "Mikoplastik." },
      { id: 1, text: "Mikoservis." },
      { id: 2, text: "Mikola Syabila" },
      { id: 3, text: "Mikosayang" },
    ],
    answer: 2,
  },
  {
    id: 2,
    question: "Siapa nama lengkap Miko?",
    options: [
      { id: 0, text: "Mikoplastik." },
      { id: 1, text: "Mikoservis." },
      { id: 2, text: "Mikola Syabila" },
      { id: 3, text: "Mikosayang" },
    ],
    answer: 2,
  },
  {
    id: 3,
    question: "Siapa nama lengkap Miko?",
    options: [
      { id: 0, text: "Mikoplastik." },
      { id: 1, text: "Mikoservis." },
      { id: 2, text: "Mikola Syabila" },
      { id: 3, text: "Mikosayang" },
    ],
    answer: 2,
  },
];

function submitQuiz() {
  for (question in questions) {
    
  }
}

</script>

<template>
  <Header />
  <div id="join-wrapper">
    <form @submit.prevent="submitQuiz">
      <Question
        v-for="question in questions"
        :question="question"
        :key="question.id"
      />
      <input type="submit" id="submit-btn">
    </form>
  </div>
</template>

<style scoped>
  #join-wrapper {
    display: flex;
    justify-content: center;
  }

  form {
    width: 50%;
    display: flexbox;
  }

  #submit-btn {
    width: 60%;
    height: 5rem;
    border: 2px solid ;
    border-radius: 14px;
    position: relative;
    left: 20%;
    margin-bottom: 5rem;
    background-color: #5DA2CD;
    color: white;
  }

  #submit-btn:hover {
    background-color: #F3B124;
    cursor: pointer;
  }
</style>
