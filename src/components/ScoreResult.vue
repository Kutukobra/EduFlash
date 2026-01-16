<script setup>
const props = defineProps({
  score: Number,
});
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="overlay">
    <h1>Skor Anda</h1>
    <span>{{ Math.round(score) }}</span>
  </div>
</template>

<style scoped>
* {
  color: #016493;
}

h1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  border: 1px solid #016493;
  border-radius: 14px;
}

span {
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
