<script setup></script>

<template>
  <div class="overlay" @click="$emit('close-popup')">
    <main class="popup" @click.stop>
      <h1>Buat Latihan Soal</h1>
      <form>
        <textarea type="text" name="quiz-prompt" placeholder="Ketik perintah untuk membuat latihan soal"></textarea>
        <input type="submit" value="Buat dan bagikan"/>
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

.popup {
    background-color: white;
    box-sizing: border-box;
    width: 30%;
    height: 50%;
    border: 1px solid #5DA2CD;
    border-radius: 15px;
    padding: 1rem;
}

.popup, form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

form {
    width: 80%;
    height: 100%;
}

h1 {
    color: #016493;
    padding: 0.5rem;
}

form > * {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #CBD5E1;
    border-radius: 15px;
}

textarea {
    resize: none;
    flex-grow: 3;
    border: 1px solid #CBD5E1;
    overflow: visible;
    padding: 1rem;
}

input[type="submit"] {
    flex-grow: 1;
    max-height: 20%;
    background-color: #016493;
  color: #ffffff;
  min-height: 2.5rem;
  padding: 0;
  font-size: 1.3rem;
}

input[type="submit"]:hover {
  cursor: pointer;
}
</style>
