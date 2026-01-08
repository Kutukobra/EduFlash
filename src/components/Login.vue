<script setup>

</script>

<template>
    <div>
        <form>
            <h2>Masuk ke Akun Anda</h2>
            <p>Masukkan email dan kata sandi Anda</p>
            <label for="email">Email</label>
            <input type="email" id="email" name="email">
            <label for="password">Kata Sandi</label>
            <input type="password" id="password" name="password">
            <input type="submit" value="Masuk">
            <p id="register-link">Belum punya akun? <a>Daftar</a></p>
        </form>
    </div>
</template>

<style scoped>
    div {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    form {
        display: flex;
        flex-direction: column;

        border: 1px solid #CBD5E1;
        border-radius: 12px;

        padding: 2rem;
    }

    #register-link{
        text-align: center;
    }
</style>