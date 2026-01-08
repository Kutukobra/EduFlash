<script setup>
import Header from "./Header.vue";
import Navbar from "./Navbar.vue";
</script>

<template>
  <Header />
  <div id="join-wrapper">
    <main>
      <div id="join-input">
        <h2>Latihan soal membuatmu makin pintar lho!</h2>
        <div id="join">
          <input type="text" placeholder="Masukkan kode kuis" maxlength="6"/>
          <button>Gabung</button>
        </div>
      </div>
    </main>
    <Navbar id="navbar"/>
  </div>
</template>

<style scoped>
#join-wrapper {
  margin-top: 2rem;
  display: flex;
  height: 80vh;
  position: absolute;
  width: 100%;
}

#join-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  color: #016493;
  font-size: 2rem;
}

#join {
  box-sizing: border-box;

  position: relative;
  display: inline-block;
  width: 35rem;
  height: 4rem;

  margin: 1.5rem;
}

input {
  width: 100%;
  height: 100%;
  border: 1px solid #016493;
  border-radius: 10px;
  padding: 1.2rem;

  font-size: 1.5rem;
}

input::placeholder {
  font-size: 1.5rem;
  color: #016493;
}

button {
  position: absolute;
  
  right: 0.2%;
  top: 2%;

  height: 100%;

  border: 0px;
  border-radius: 15px;
  background-color: #016493;
  color: #FFFFFF;
  font-size: 1.5rem;
  padding: 1rem;
}

main {
  width: 80%;
}

</style>
