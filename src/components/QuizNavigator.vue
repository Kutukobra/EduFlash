<script setup>
import { defineProps } from "vue";

defineProps({
  questions: Object,
  selection: Object,
  current: Number,
});

const emit = defineEmits(["navigate"]);
</script>

<template>
  <section>
    <div
      v-for="(_, index) in questions"
      :class="{
        'quiz-selection': true,
        current: index === current,
      }"
      @click="$emit('navigate', index)"
    >
      {{ index + 1 }}
    </div>
  </section>
</template>

<style scoped>
section {
  background-color: #016493;
  border: 0;
  border-radius: 14px;
  display: grid;
  gap: 0.5em;
  grid-template-columns: repeat(4, auto);
  padding: 1rem;
  justify-self: center;
}

.quiz-selection {
  font-size: 1.2rem;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  min-width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  cursor: pointer;
}

.current,
.quiz-selection:hover {
  background-color: #f3b124;
}
</style>
