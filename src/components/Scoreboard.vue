<script setup>
import { defineProps } from "vue";

defineProps({
  results: Object,
});
</script>

<template>
  <div class="scoreboard">
    <div class="result" v-for="result in results" :key="result.name">
      <span>{{ result.name }}</span>
      <span>{{ result.score }}</span>
    </div>
  </div>
</template>

<style scoped>
.scoreboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.result {
  background-color: #016493;
  color: white;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-radius: 14px;
  box-sizing: border-box;
  padding: 2rem;
}
</style>
