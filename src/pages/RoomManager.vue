<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <div class="content-wrapper">
      <main>
        <h1>Rekam Kelas</h1>
        <section class="recording">rekam</section>
        <section class="transcript">
            <h2>Transkrip Audio</h2>
            <div>

            </div>
        </section>
        <section class="options">optoions</section>
      </main>
  </div>
</template>

<style scoped>
.content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    color: #016493;
    display: flex;
    align-items: center;
    justify-content: center;
}

main {
  display: grid;
  grid-template-areas:
    "title      ."
    "recording options"
    "transcript options";

  position: relative;
  width: 80%;
  height: 80%;

  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr 12fr 8fr;
  gap: 2rem;

  box-sizing: border-box;
}

main > * {
  box-sizing: border-box;
  border-radius: 15px;
}

.recording {
  grid-area: recording;
  border: 1px solid #016493;
}
.transcript {
  grid-area: transcript;
  border: 1px solid #016493;
  overflow: hidden;
}

h2 {
    width: 100%;
    height: 20%;
    background-color: #016493;
    color: white;
    font-weight: 300;
    display: flex;
    align-items: center;
    padding-left: 1.2rem;
}

.options {
  grid-area: options;
  border: 1px solid #016493;
}
</style>
