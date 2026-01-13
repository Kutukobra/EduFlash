<script setup>
const props = defineProps({
  score: Number,
});
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="overlay">
    <div class="popup">
      <h1>Skor Anda</h1>
      <span class="score">{{ Math.round(score) }}%</span>
      <button @click="emit('close')">Tutup</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.popup {
  background: white;
  padding: 2rem 3rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.25);
}

.score {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  margin: 1rem 0;
}

button {
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  border: none;
  background: #016493;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
</style>
