<script setup></script>

<template>
  <nav id="navbar">
    <div class="features-nav">Rekaman Vidio dan Audio</div>
    <div class="features-nav">Tanya Jawab dengan Edu</div>
    <div class="features-nav">Sumber Belajar</div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 2rem;

  border: 2px solid #016493;
  border-radius: 14px;

  padding: 1.5rem;

  max-width: 25%;
}

.features-nav {
  color: #ffffff;

  font-size: 1.2rem;
  background-color: #e9b03f;
  border: 0;
  border-radius: 13px;
  width: 90%;
  min-height: 4rem;

  padding: 0.8rem;
}
</style>
