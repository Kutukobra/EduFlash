<script setup>
import Header from "@/components/Header.vue";
import { ref, defineModel } from "vue";
import axios, { HttpStatusCode } from "axios";
import Navbar from "@/components/Navbar.vue";


const invalidRoom = ref(false);

</script>

<template>
  <Header />
  <div id="join-wrapper">
    <main>
      
    </main>
    <Navbar />
  </div>
</template>

<style scoped>
#join-wrapper {
  width: 100%;
}

main {
  width: 50%;
}

#navbar {
  width: 20%;
}
</style>
