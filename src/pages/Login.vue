<script setup>
import EduFlashLogo from "@/components/EduFlashLogo.vue";
import axios, { HttpStatusCode } from "axios";
import router from "@/router";
import { ref } from "vue";
import { setUserData } from "@/storage/teacher";

const email = ref("");
const password = ref("");

const failedLogin = ref(false);

function submitLogin() {
  axios
    .post("/user/login", {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      if (response.status == HttpStatusCode.Ok) {
        var user = response.data.user;
        setUserData(user.id, user.name);
        router.push("/dashboard");
      }
    })
    .catch((error) => {
      if (error.response) {
        var status = error.response.status;
        if (
          status == HttpStatusCode.Unauthorized ||
          status == HttpStatusCode.BadRequest
        ) {
          failedLogin.value = true;
        }
      } else {
        console.log(error);
      }
    });
}
</script>

<template>
  <EduFlashLogo />
  <div id="wrapper">
    <form @submit.prevent="submitLogin">
      <div id="login-prompt">
        <h1>Masuk ke Akun Anda</h1>
        <p>Masukkan email dan kata sandi Anda</p>
      </div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Masukkan email Anda"
        required
        v-model="email"
      />
      <label for="password">Kata Sandi</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Masukkan password Anda"
        required
        v-model="password"
      />
      <span v-if="failedLogin" class="failed-request"
        >Email atau kata sandi salah</span
      >
      <input id="login-btn" type="submit" value="Masuk" />
      <p id="register-link">
        Belum punya akun? <RouterLink to="/register"><a>Daftar</a></RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped>
@import url(../assets/entrypage.css);
</style>
