<script setup>
import EduFlashLogo from "@/components/EduFlashLogo.vue";
import axios, { HttpStatusCode } from "axios";
import router from "@/router";
import { defineModel } from "vue";

const email = defineModel("email");
const password = defineModel("password");

function submitLogin() {
  axios
    .post("/user/login", {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      if (response.status == HttpStatusCode.Ok) {
        var user = response.data.data
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);
        router.push("/dashboard")
      }
    })
    .catch((error) => {
      console.log(error)
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
