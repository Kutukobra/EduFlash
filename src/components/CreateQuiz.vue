<script setup></script>

<template>
  <div class="overlay">
    <main class="popup">
      <h1>Buat Latihan Soal</h1>
      <form>
        <textarea placeholder=""></textarea>
      </form>
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
</style>
