<script setup>
import EduFlashLogo from "@/components/EduFlashLogo.vue";
</script>

<template>
  <div>
    <div id="wrapper">
      <EduFlashLogo id="eduflashlogo" />
      <RouterLink to="/login">
        <button id="teacher-login">Masuk sebagai guru</button>
      </RouterLink>
      <RouterLink to="/join">
        <button id="student-login">Masuk sebagai siswa</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
div {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom right, #f2fdff, #5da2cd);
}

#eduflashlogo {
  font-size: 6rem;
}

#wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  min-width: 18rem;
  min-height: 3rem;

  border: 0px solid;
  border-radius: 15px;
  margin: 0.5rem;

  font-size: 1.1rem;
}

button:hover {
  cursor: pointer;
}

#teacher-login {
  background-color: #ffffff;
  color: #016493;
}

#student-login {
  background-color: #016493;
  color: #ffffff;
}
</style>
