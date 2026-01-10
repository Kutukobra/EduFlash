<script setup>
import EduFlashLogo from "@/components/EduFlashLogo.vue";
</script>

<template>
  <EduFlashLogo />
  <div id="wrapper">
    <form>
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
      />
      <label for="password">Kata Sandi</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Masukkan password Anda"
        required
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
