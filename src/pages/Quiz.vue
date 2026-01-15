<script setup>
import Header from "@/components/Header.vue";
import Question from "@/components/Question.vue";
import ScoreResult from "@/components/ScoreResult.vue";
import { ref } from "vue";

const questions = [
  {
    id: 0,
    question: "Siapa nama lengkap Miko?",
    options: [
      { id: 0, text: "Mikoplastik." },
      { id: 1, text: "Mikoservis." },
      { id: 2, text: "Mikola Syabila" },
      {
        id: 3,
        text: "Mikosayang Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    answer: 2,
    explanation:
      "Assalamualaikum warahmatullahi wabarakatuh, Salam sejahtera bagi kita semua, Shalom, Om Swastyastu, Namo Buddhaya, Salam Kebajikan",
  },
];

const answers = ref({});
const score = ref(0);

const showScore = ref(false);

function submitQuiz() {
  var questionCount = questions.length;
  var correctAnswer = 0;
  for (const question of questions) {
    if (answers.value[question.id] == question.answer) {
      console.log({
        answered: answers.value[question.id],
        answer: question.answer,
      });
      correctAnswer++;
    }
  }
  score.value = (correctAnswer / questionCount) * 100.0;
  showScore.value = true;
}

function handleUpdate({ questionId, optionId }) {
  answers.value[questionId] = optionId;
  console.log(answers.value);
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
        @update="handleUpdate"
      />
      <input type="submit" id="submit-btn" />
    </form>
  </div>
  <ScoreResult :score="score" v-if="showScore" @close="showScore = false" />
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
  border: 2px solid;
  border-radius: 14px;
  position: relative;
  left: 20%;
  margin-bottom: 5rem;
  background-color: #5da2cd;
  color: white;
}

#submit-btn:hover {
  background-color: #f3b124;
  cursor: pointer;
}
</style>
