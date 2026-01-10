<script setup>
import EduFlashLogo from "./EduFlashLogo.vue";
import { defineProps } from "vue";

defineProps({
  name: String,
  role: String,
})
</script>

<template>
  <div id="wrapper">
    <EduFlashLogo id="eduflashlogo" />
    <div id="profile-wrapper">
      <div id="profile-info">
        <span id="name-display">{{ name }}</span>
        <span id="role-display">{{ role }}</span>
      </div>
      <img id="profile-picture" src="https://placehold.co/64x64" />
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.8rem;
}

#eduflashlogo {
  position: relative;
  left: 2rem;
}

#profile-wrapper {
  box-sizing: border-box;
  position: relative;
  display: flex;
  right: 3rem;
  padding: 0.6rem;
  color: #016493;
}

#profile-info {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  margin-right: 1rem;
}

#profile-picture {
  background-color: black;
  width: 3rem;
  aspect-ratio: 1 / 1;
  border: 4px solid #016493;
  border-radius: 50%;
}

#name-display{
    font-weight: 800;
    font-size: 1.1rem;
}

#role-display{
    font-weight: 500;
}
</style>
