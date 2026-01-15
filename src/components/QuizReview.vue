<script setup>
import Question from "@/components/Question.vue";
import { defineProps } from "vue";

defineProps({
  questions: Object
})

</script>

<template>
  <div class="wrapper">
    <form>
      <Question
        v-for="question in questions"
        :question="question"
        :key="question.id"
        :answer-shown="true"
      />
    </form>
  </div>
</template>

<style scoped>
.wrapper {
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
