<script setup>
import Header from "@/components/Header.vue";
import Question from "@/components/Question.vue";
import QuizNavigator from "@/components/QuizNavigator.vue";
import ScoreResult from "@/components/ScoreResult.vue";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { getStudentData } from "@/storage/student";
import router from "@/router";

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
  {
    id: 1,
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
  {
    id: 2,
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
  {
    id: 3,
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
  {
    id: 4,
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
  {
    id: 5,
    question: "Siapa nama lengkap Miko?",
    options: [
      { id: 0, text: "Mikoplastik." },
      { id: 1, text: "Mikoservis." },
      { id: 2, text: "Mikola Syabila" },
      {
        id: 3,
        text: "Mikokontroler",
      },
    ],
    answer: 2,
    explanation:
      "Assalamualaikum warahmatullahi wabarakatuh, Salam sejahtera bagi kita semua, Shalom, Om Swastyastu, Namo Buddhaya, Salam Kebajikan",
  },
];

const route = useRoute();

const questionIndex = ref(0);
const currentQuestion = ref({});

const selection = ref({});
const score = ref(0);

const showScore = ref(false);

function postScore() {
  const student = getStudentData();
  axios.post(`/quiz/${route.params.quizId}/submit`, {
    studentName: student.username,
    score: score.value || 0,
  });
}

function submitQuiz() {
  if (showScore.value === true) {
    router.back();
  }
  var questionCount = questions.length;
  var correctAnswer = 0;
  for (const question of questions) {
    if (selection.value[question.id] == question.answer) {
      console.log({
        answered: selection.value[question.id],
        answer: question.answer,
      });
      correctAnswer++;
    }
  }
  score.value = (correctAnswer / questionCount) * 100.0;
  showScore.value = true;
  questionIndex.value = 0;
  postScore();
}

function handleUpdate({ questionId, optionId }) {
  selection.value[questionId] = optionId;
}

watch(questionIndex, (curr) => {
  if (curr < 0) questionIndex.value = 0;
  if (curr >= questions.length) questionIndex.value = questions.length - 1;

  currentQuestion.value = questions[curr];
});

onMounted(() => {
  currentQuestion.value = questions[questionIndex.value];
});
</script>

<template>
  <Header />
  <div class="wrapper">
    <div class="grid">
      <h1 class="header">Quiz</h1>
      <QuizNavigator
        :questions="questions"
        :selection="selection"
        :current="questionIndex"
        @navigate="(index) => (questionIndex = index)"
        class="map"
      />
      <ScoreResult :score="score" v-show="showScore" class="score" />
      <form @submit.prevent="submitQuiz" class="quiz">
        <Question
          :question="currentQuestion"
          :key="currentQuestion.id"
          :selected="selection[questionIndex]"
          :answer-shown="showScore"
          @update="handleUpdate"
        />
      </form>
      <div class="quiz-navigation">
        <button @click="questionIndex--"><</button>
        <button
          v-if="questionIndex < questions.length - 1"
          @click="questionIndex++"
        >
          >
        </button>
        <button v-else @click.prevent="submitQuiz" class="submit-btn">
          Selesai
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid {
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "header header"
    "map quiz"
    "score quiz"
    "navigator navigator";
  grid-template-columns: 1fr 10fr;
  grid-template-rows: auto 2fr 5fr auto;
  gap: 1rem;
}

h1 {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  color: #016493;
}

.map {
  grid-area: map;
}

.score {
  grid-area: score;
}

form {
  display: flex;
  grid-area: quiz;
}

.quiz-navigation {
  grid-area: navigator;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  color: white;
  background-color: #5da2cd;
  border: 0;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  width: 5%;
  font-size: 2rem;
}

.submit-btn {
  border-radius: 14px;
  aspect-ratio: 0;
  width: 8rem;
  height: 4rem;
}
</style>
