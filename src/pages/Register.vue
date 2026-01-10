<script setup>
import EduFlashLogo from "@/components/EduFlashLogo.vue";
</script>

<template>
  <EduFlashLogo id="eduflashlogo" />
  <div id="wrapper">
    <form>
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
      />
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Masukkan email Anda"
        required
      />

      <label for="role" >Peran</label>
      <select id="role" required>
        <option value="">Pilih peran Anda</option>
        <option value="teacher">Guru</option>
        <option value="student">Murid</option>
      </select>

      <label for="password">Kata Sandi</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Masukkan kata sandi Anda"
        required
      />
      <label for="password-confirm">Konfirmasi Kata Sandi</label>
      <input
        type="password"
        id="password-confirm"
        name="password-confirm"
        placeholder="Masukkan ulang kata sandi Anda"
        required
      />
      <input id="login-btn" type="submit" value="Daftar" />
      <p id="register-link">
        Sudah memiliki akun? <RouterLink to="/login"><a>Masuk</a></RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped>
@import url(../assets/entrypage.css);
</style>
