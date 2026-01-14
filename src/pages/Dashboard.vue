<script setup>
import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue";

const username = ref("")

const roomHistory = [
  {
    title: "Matematika",
    roomId: "0000004",
  },
  {
    title: "Matematika",
    roomId: "0000005",
  },
  {
    title: "Matematika",
    roomId: "0000006",
  },
  {
    title: "Matematika",
    roomId: "0000007",
  },
  {
    title: "Matematika",
    roomId: "0000008",
  },
  {
    title: "Matematika",
    roomId: "0000009",
  },
  {
    title: "Matematika",
    roomId: "0000010",
  },
]

onMounted(() => {
  username.value = localStorage.getItem("username");
})

function newRoom() {
  console.log("Test")
}
</script>

<template>
  <Header />
  <main>
    <h1>Mulai kelas hari ini, {{ username }}</h1>
    <section>
      <h2>Kelas Anda</h2>
      <div id="class-grid">
        <div id="new-class" @click="newRoom">
          <h4>+</h4>
          <span>Buat Kelas Baru</span>
        </div>
        <div class="room-card" v-for="room in roomHistory" :key="room.roomId">
          <div class="room-card-top">
            <h3>{{ room.title }}</h3>
          </div>
          <div class="room-card-bottom">
            <span>Kode Kelas: {{ room.roomId }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

#new-class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #016493;
  background-color: #F2FDFF;
}

#new-class h4 {
  font-size: 5rem;
}

#new-class span {
  font-size: 1.2rem;
  margin-top: 1rem;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #016493;
  font-size: 2.4rem;
  margin-bottom: 4rem;
  margin-top: 2rem;
}

h2 {
  color: #016493;
  margin-bottom: 2rem;
}

section {
  position: relative;
  width: 60%;
  height: 50%;
}

#class-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3.2rem;
}

#new-class,
.room-card {
  box-sizing: border-box;
  border: 1px solid #4176C5;
  border-radius: 8px;
  background: white;
  overflow: hidden;

  aspect-ratio: 4 / 3;
}

h3 {
  position: relative;
  top: 40%;
  left: 5%;
  color: white;
}

.room-card-top {
  box-sizing: border-box;
  width: 100%;
  height: 55%;
  margin: 0px;
  background-color: #4176C5;
}

.room-card-bottom {
  width: 100%;
  height: 45%;
}

.room-card-bottom span {
  position: relative;
  left: 5%;
  top: 40%;
  font-size: 1rem;
}

#new-class {
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
