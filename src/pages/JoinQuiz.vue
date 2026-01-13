<script setup>
import Header from "@/components/Header.vue";
import HistoryCard from "@/components/HistoryCard.vue";
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";

const histories = ref([
  {
    grade: 85,
    title: "Bitchass Quiz",
    date: "23 January 2025",
  },
  {
    grade: 85,
    title: "Operasi Perkalian",
    date: "23 January 2025",
  },
  {
    grade: 85,
    title: "Pertambahan",
    date: "23 January 2025",
  },
  {
    grade: 85,
    title: "Pertambahan",
    date: "23 January 2025",
  },
  {
    grade: 85,
    title: "Pertambahan",
    date: "23 January 2025",
  },
  {
    grade: 85,
    title: "Pertambahan",
    date: "23 January 2025",
  },
  {
    grade: 85,
    title: "Pertambahan",
    date: "23 January 2025",
  },
]);
</script>

<template>
  <Header name="Nadira" role="Siswa"/>
  <div id="join-wrapper">
    <main>
      <div>
        <h2>Latihan soal membuatmu makin pintar lho!</h2>
        <div id="join-input">
          <input type="text" placeholder="Masukkan kode latihan soal" maxlength="6"/>
          <button>Gabung</button>
        </div>
      </div>
      <h3>Latihan soal yang telah selesai</h3>
      <div id="history-grid">
        <HistoryCard v-for="history in histories" :key="history.title" :history="history"/>
      </div>
    </main>
    <Navbar />
  </div>
</template>

<style scoped>
#join-wrapper {
  margin-top: 2rem;
  display: flex;
  height: 80vh;
  position: relative;
  width: 100%;
  justify-content: space-between;
}

main {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: center;

  left: 10vw;

  max-width: 75%;
}

#navbar {
  position: relative;
  margin-right: 3.5rem;
}

main > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  color: #016493;
  font-size: 2.5rem;
  font-weight: 900;
}

#join-input {
  box-sizing: border-box;

  position: relative;

  display: flex;

  align-items: center;
  
  width: 40rem;
  height: 6rem;

  margin-top: 1.5rem;
}

input {
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  border: 1px solid #016493;
  border-radius: 10px;
  padding: 1.2rem;

  font-size: 2rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

input::placeholder {
  position: relative;
  left: 1rem;
  font-size: 1.2rem;
  color: #016493;
}

button {
  position: absolute;

  right: 2%;

  height: 72%;

  border: 0px;
  border-radius: 15px;
  background-color: #016493;
  color: #FFFFFF;
  font-size: 1.5rem;
  padding: 1rem;
}

h3 {
  color: #E9B03F;
  font-size: 1.6rem;
  text-align: left;
  margin: 1rem;
  margin-left: 0;
  margin-top: 3.5rem;
}

#history-grid {
  display: grid;
  grid-template-columns: 49% 49%;
  gap: 2%;
  row-gap: 1.5rem;
  position: relative;
}

</style>
