<script setup>
defineEmits(["close-popup"]);
</script>

<template>
  <div class="overlay" @click="$emit('close-popup')">
    <main class="popup" @click.stop>
      <slot />
    </main>
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
  box-sizing: border-box;
  width: 30%;
  height: 50%;
  border: 1px solid #5da2cd;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}
</style>
