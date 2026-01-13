<script setup>
import EduFlashLogo from "@/components/EduFlashLogo.vue";
import axios, { HttpStatusCode } from "axios";
import { defineModel, ref } from "vue";
import router from "@/router";

const email = defineModel("email");
const username = defineModel("username");
const password = defineModel("password");
const confirmPassword = defineModel("confirmPassword");
const role = defineModel("role");

const passwordMismatch = ref(false);
const badRequest = ref(false);
const internalError = ref(false);

function submitRegister() {
  if (password.value != confirmPassword.value) {
    passwordMismatch.value = true;
    return;
  }

  axios
    .post("/user/register", {
      email: email.value,
      username: username.value,
      password: password.value,
      role: role.value,
    })
    .then((response) => {
      console.log(response.data);
      if (response.status === HttpStatusCode.BadRequest) {
        badRequest.value = true;
      } else if (response.status === HttpStatusCode.InternalServerError) {
        internalError.value = true;
      } else {
        router.push("/login")
      }
    })
    .catch((error) => {
      internalError.value = true;
      console.log(error)
    });
}
</script>

<template>
  <EduFlashLogo id="eduflashlogo" />
  <div id="wrapper">
    <form @submit.prevent="submitRegister">
      <div id="login-prompt">
        <h1>Buat Akun Anda</h1>
        <p>Masukkan email dan buat kata sandi Anda</p>
      </div>
      <label for="email">Nama</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Masukkan nama Anda"
        required
        v-model="username"
      />
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Masukkan email Anda"
        required
        v-model="email"
      />

      <!-- <label for="role">Peran</label>
      <select id="role" required v-model="role">
        <option disabled value="">Pilih peran Anda</option>
        <option value="teacher">Guru</option>
        <option value="student">Murid</option>
      </select> -->

      <label for="password">Kata Sandi</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Masukkan kata sandi Anda"
        required
        v-model="password"
      />
      <label for="password-confirm">Konfirmasi Kata Sandi</label>
      <input
        type="password"
        id="password-confirm"
        name="password-confirm"
        placeholder="Masukkan ulang kata sandi Anda"
        required
        v-model="confirmPassword"
      />
      <p class="failed-request" v-if="passwordMismatch === true">
        Konfirmasi kata sandi salah
      </p>
      <p v-if="internalError === true">
        Terjadi kesalahan
      </p>
      <input id="login-btn" type="submit" value="Daftar" />
      <p id="register-link">
        Sudah memiliki akun? <RouterLink to="/login"><a>Masuk</a></RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped>
@import url(../assets/entrypage.css);

.failed-request {
  width: 100%;
  color: red;
}
</style>
