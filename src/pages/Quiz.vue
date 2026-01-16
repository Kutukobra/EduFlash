<script setup>
import Header from "@/components/Header.vue";
import Question from "@/components/Question.vue";
import ScoreResult from "@/components/ScoreResult.vue";
import { onMounted, ref, watch } from "vue";

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
];


const questionIndex = ref(0);
const currentQuestion = ref({});

const selection = ref({});
const score = ref(0);

const showScore = ref(false);

function submitQuiz() {
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
}

function handleUpdate({ questionId, optionId }) {
  selection.value[questionId] = optionId;
}

watch(questionIndex, (curr) => {
  if (curr < 0) questionIndex.value = 0;
  if (curr >= questions.length) questionIndex.value = questions.length - 1;

  currentQuestion.value = questions[curr];
})

onMounted(() => {
  currentQuestion.value = questions[questionIndex.value];
})
</script>

<template>
  <Header />
  <div class="wrapper">
    <form @submit.prevent="submitQuiz">
      <Question
        :question="currentQuestion"
        :key="currentQuestion.id"
        :selected="selection[questionIndex]"
        @update="handleUpdate"
      />
    </form>
    <div class="quiz-navigation">
      <button v-if="questionIndex > 0" @click="questionIndex--"><</button>
      <button v-if="questionIndex < questions.length - 1" @click="questionIndex++">></button>
      <button v-else @click.prevent="submitQuiz">Selesai</button>
    </div>
  </div>
  <ScoreResult :score="score" v-if="showScore" @close="showScore = false" />
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  width: 50%;
  display: flexbox;
}

</style>
