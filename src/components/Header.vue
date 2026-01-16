<script setup>
import { getUserData } from "@/storage/teacher";
import EduFlashLogo from "./EduFlashLogo.vue";
import { onMounted, ref } from "vue";
import { getStudentData } from "@/storage/student";

const name = ref("");

onMounted(() => {
  const student = getStudentData()?.username;
  const user = getUserData()?.username;

  const clean = (v) =>
    v && v !== "null" && v !== "undefined" && v.trim() !== "" ? v : null;

  name.value = clean(student) || clean(user) || "Guest";

  console.log("Resolved name:", name.value);
});

</script>

<template>
  <header>
    <div id="wrapper">
      <EduFlashLogo id="eduflashlogo" />
      <div id="profile-wrapper" v-if="name == true">
        <div id="profile-info">
          <span id="name-display">{{ name }}</span>
        </div>
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

#name-display {
  font-weight: 800;
  font-size: 1.1rem;
}

#role-display {
  font-weight: 500;
}
</style>
