<script setup>
import EduFlashLogo from "./EduFlashLogo.vue";
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

      <label for="role" placeholder="Pilih peran Anda">Peran</label>
      <select id="role">
        <option value="default">Pilih peran Anda</option>
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
      <input id="login-btn" type="submit" value="Masuk" />
      <p id="register-link">
        Sudah memiliki akun? <RouterLink to="/login"><a>Masuk</a></RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped>
#eduflashlogo {
  position: fixed;
  top: 1rem;
  left: 1rem;
}

#wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#login-prompt {
  margin-bottom: 0.7rem;
}

#login-prompt > * {
  padding: 0.5rem 0px;
}

#login-prompt > h1 {
  font-size: 1.2rem;
  color: #0f172a;
}

#login-prompt > p {
  font-size: 1rem;
  color: #64748b;
}

form {
  display: flex;
  flex-direction: column;

  border: 1px solid #cbd5e1;
  border-radius: 12px;

  padding: 2rem;
}

form > * {
  margin: 0.4rem 0.3rem;
  min-width: 20rem;
}

form > label {
  color: #15394a;
}

input,
select {
  padding: 0.3rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;

  background-color: #ffffff;
  padding-left: 1rem;

  min-height: 1.8rem;
}

select,
input::placeholder {
  color: #889da8;
}

#login-btn {
  background-color: #016493;
  color: #ffffff;
  min-height: 2.5rem;
}

#login-btn:hover {
  cursor: pointer;
}

#register-link {
  text-align: center;
}

#register-link > a {
  color: #016493;
  text-decoration: none;
}
</style>
