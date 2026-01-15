<script setup>
import EduFlashLogo from "./EduFlashLogo.vue";
import { onMounted, ref } from "vue";

const name = ref("");
const role = ref("");

const { isStudent } = defineProps({
  isStudent: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  if (isStudent) {
    name.value = sessionStorage.getItem("username");
    role.value = "Student";
  } else {
    name.value = localStorage.getItem("username");
    role.value = "Teacher";
  }
});
</script>

<template>
  <header>
    <div id="wrapper">
      <EduFlashLogo id="eduflashlogo" />
      <div id="profile-wrapper" v-if="name && role">
        <div id="profile-info">
          <span id="name-display">{{ name }}</span>
          <span id="role-display">{{ role }}</span>
        </div>
        <img
          v-if="!isStudent"
          id="profile-picture"
          src="https://placehold.co/64x64"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  width: 100%;
  justify-content: center;
}

#wrapper {
  box-sizing: border-box;
  display: flex;
  position: relative;
  width: 80%;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.8rem;
}

#eduflashlogo {
  position: relative;
}

#profile-wrapper {
  box-sizing: border-box;
  position: relative;
  display: flex;
  padding: 0.6rem;
  color: #016493;
}

#profile-info {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  position: relative;
  right: 10%;
}

#profile-picture {
  background-color: black;
  width: 3rem;
  aspect-ratio: 1 / 1;
  border: 4px solid #016493;
  border-radius: 50%;
}

#name-display {
  font-weight: 800;
  font-size: 1.1rem;
}

#role-display {
  font-weight: 500;
}
</style>
