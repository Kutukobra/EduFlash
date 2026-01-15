<script setup></script>

<template>
  <h1>Buat Latihan Soal</h1>
  <form>
    <textarea
      placeholder="Ketik perintah untuk membuat latihan soal"
    ></textarea>
    <input type="submit" value="Buat dan bagikan" />
  </form>
</template>

<style scoped>
h1 {
  color: #016493;
  padding: 0.5rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  height: 100%;
  margin: 0 auto;
}

textarea {
  resize: none;
  flex-grow: 3;
  border: 1px solid #cbd5e1;
  border-radius: 15px;
  padding: 2rem;
}

textarea::placeholder {
  color: #cbd5e1;
}

textarea,
textarea::placeholder {
  font-size: 1.2rem;
}

input[type="submit"] {
  flex-grow: 1;
  max-height: 20%;
  background-color: #016493;
  color: white;
  min-height: 2.5rem;
  border-radius: 15px;
  font-size: 1.3rem;
  border: none;
}

input[type="submit"]:hover {
  cursor: pointer;
}
</style>
