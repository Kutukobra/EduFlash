<script setup>
import { defineProps, defineEmits, onMounted } from "vue";
defineProps({
  question: Object,
  answerShown: Boolean,
  selected: Number,
});

const emit = defineEmits(["update"]);
</script>

<template>
  <section
    :class="{
      question: true,
      'question-enabled': answerShown == false,
    }"
  >
    <h3>{{ question.id + 1 + ". " + question.question }}</h3>
    <label
      v-for="option in question.options"
      :key="option.id"
      :class="{
        answer: answerShown && option.id === question.answer,
        incorrect: answerShown && option.id === selected,
        selected: !answerShown && option.id === selected,
      }"
    >
      <input
        type="radio"
        :name="'q_' + question.id"
        :value="option.id"
        @change="
          $emit('update', { questionId: question.id, optionId: option.id })
        "
        :disabled="answerShown"
      />
      {{ option.text }}
    </label>
    <section v-if="answerShown" class="explanation">
      <h2>Pembahasan</h2>
      {{ question.explanation }}
    </section>
  </section>
</template>

<style scoped>
.explanation {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  width: 100%;
  border: 2px dashed #016493;
  border-radius: 14px;
  box-sizing: border-box;
  padding: 1rem;
}

.explanation > h2 {
  color: #016493;
}

label {
  display: block;
  position: relative;
  width: 100%;
}

.question {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

input {
  appearance: none;
}

.question h3 {
  font-size: 1.5rem;
  color: #15394a;
  font-weight: 800;
  margin-bottom: 1.2rem;
}

.question > label {
  box-sizing: border-box;
  margin: 0.5rem 0;
  border: 0;
  border-radius: 14px;
  background-color: #016493;
  padding: 1rem;
  font-size: 1.2rem;
  color: #ffffff;
}

.question-enabled > label:hover {
  cursor: pointer;
  background-color: #f3b124;
}

.question > label.selected {
  background-color: #f3b124;
}

.question > label.answer {
  background-color: #76c408;
}

.question > label.incorrect {
  background-color: #c43408;
}

</style>
