<script setup>
import { defineProps } from "vue";
defineProps({
  question: Object,
});
</script>

<template>
  <section class="question">
    <h3>{{ question.id + 1 + ". " + question.question }}</h3>
    <label v-for="option in question.options">
      <input
        type="radio"
        :name="'q_' + question.id"
        :value="option.id"
        @change="
          $emit('update', { questionId: question.id, optionId: option.id })
        "
      />
      {{ option.text }}
    </label>
  </section>
</template>

<style scoped>
label {
  display: block;
  position: relative;
  width: 100%;
}

.question {
  padding: 1rem;
}

.question h3 {
  font-size: 1.5rem;
  color: #15394a;
  font-weight: 800;
}

.question > label {
  box-sizing: border-box;
  margin: 0.5rem;
  border: 0;
  border-radius: 14px;
  background-color: #016493;
  padding: 1rem;
  font-size: 1.2rem;
  color: #ffffff;
}

.question > label:hover {
  cursor: pointer;
  background-color: #f3b124;
}

.question > label:has(input:checked) {
  background-color: #f3b124;
}
</style>
