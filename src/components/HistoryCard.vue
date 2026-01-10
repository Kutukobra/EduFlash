<script setup>
import { defineProps } from 'vue';
defineProps({
    history: Object,
});
</script>

<template>
  <div class="history-card">
    <div id="grade-box">
        <h3>Nilai</h3>
        {{ history.grade }}
    </div>
    <div id="history-info">
        <a>{{ history.title }}</a>
        <span>{{ history.date }}</span>  
    </div>
    <span>Pembahasan</span>
  </div>
</template>

<style>
.history-card {

    position: relative;
    box-sizing: border-box;
    border: 1px solid #5DA2CD;
    border-radius: 15px;
    padding: 1rem;
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;

    margin-bottom: 0rem;
}

#history-info {
    display: flex;
    flex-direction: column;

    text-align: left;
}

#grade-box {
    padding: 1rem;
    border: 1px solid #DDDDDD;
    border-radius: 15px;
    margin-right: 1.5rem;

    background-color: #5DA2CD;
    color: #FFFFFF;

    font-size: 2.5rem;
    font-weight: bold;
    padding: 1rem;

    aspect-ratio: 95 / 90;
    height: 80%;
}

#history-info > a {
    color: #016493;
    font-size: 1.3rem;
    font-weight: 800;
}

#history-info > span {
    color: #5DA2CD;
    font-weight: 900;
    font-size: 0.8rem;
}

h3 {
    font-size: 1rem;
}

#history-info > a {
    font-weight: 900;
}

.history-card > span {
    position: absolute;
    right: 2rem;
    bottom: 0.5rem;
    color: #5DA2CD;
    font-size: 0.9rem;
}
</style>
