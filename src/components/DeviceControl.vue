<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  connectBLE,
  disconnectBLE,
  sendPasskey,
  provisionDevice,
  isConnected,
  getDeviceName,
  setupDisconnectListener,
} from "@/services/bleService";

const props = defineProps({
  roomId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["deviceConnected", "deviceProvisioned"]);

const status = ref("disconnected"); // disconnected | connecting | connected | authenticated | provisioned
const deviceName = ref(null);
const error = ref(null);
const passkey = ref("");
const countdown = ref(30);
const wsHost = ref("localhost");
const wsPort = ref(3000);

let countdownInterval = null;

async function handleConnect() {
  status.value = "connecting";
  error.value = null;

  try {
    const result = await connectBLE();
    deviceName.value = result.name;
    status.value = "connected";
    startCountdown();

    setupDisconnectListener(() => {
      handleDisconnect();
    });

    emit("deviceConnected", result);
  } catch (err) {
    error.value = err.message;
    status.value = "disconnected";
  }
}

async function handlePasskeySubmit() {
  if (!passkey.value) return;

  try {
    await sendPasskey(passkey.value);
    status.value = "authenticated";
    stopCountdown();
    passkey.value = "";
  } catch (err) {
    error.value = "Passkey salah atau koneksi gagal";
  }
}

async function handleProvision() {
  try {
    await provisionDevice(props.roomId, wsHost.value, wsPort.value);
    status.value = "provisioned";
    emit("deviceProvisioned", {
      roomId: props.roomId,
      wsHost: wsHost.value,
      wsPort: wsPort.value,
    });

    // Disconnect after successful provision
    setTimeout(() => {
      handleDisconnect();
    }, 2000);
  } catch (err) {
    error.value = "Gagal melakukan provisioning";
  }
}

function handleDisconnect() {
  disconnectBLE();
  status.value = "disconnected";
  deviceName.value = null;
  stopCountdown();
}

function startCountdown() {
  countdown.value = 30;
  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      handleTimeout();
    }
  }, 1000);
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

function handleTimeout() {
  stopCountdown();
  error.value = "Waktu habis. Silakan hubungkan ulang.";
  handleDisconnect();
}

onUnmounted(() => {
  stopCountdown();
  if (isConnected()) {
    disconnectBLE();
  }
});
</script>

<template>
  <div class="device-control">
    <h3>Kontrol Perangkat IoT</h3>

    <div v-if="status === 'disconnected'" class="control-section">
      <p>Hubungkan perangkat ESP32 untuk mulai merekam</p>
      <button @click="handleConnect" class="btn-primary">Hubungkan Perangkat</button>
    </div>

    <div v-else-if="status === 'connecting'" class="control-section">
      <p>Menghubungkan ke perangkat...</p>
    </div>

    <div v-else-if="status === 'connected'" class="control-section">
      <div class="device-info">
        <p><strong>Perangkat:</strong> {{ deviceName }}</p>
        <p class="countdown">Waktu tersisa: {{ countdown }}s</p>
      </div>
      <form @submit.prevent="handlePasskeySubmit" class="passkey-form">
        <label for="passkey">Masukkan Passkey:</label>
        <input
          id="passkey"
          v-model="passkey"
          type="text"
          placeholder="000000"
          maxlength="6"
          pattern="[0-9]{6}"
        />
        <button type="submit" class="btn-primary" :disabled="passkey.length !== 6">
          Kirim
        </button>
      </form>
      <button @click="handleDisconnect" class="btn-secondary">Batalkan</button>
    </div>

    <div v-else-if="status === 'authenticated'" class="control-section">
      <div class="device-info">
        <p><strong>Perangkat:</strong> {{ deviceName }}</p>
        <p class="success">✓ Terautentikasi</p>
      </div>
      <div class="provision-form">
        <h4>Konfigurasi WebSocket</h4>
        <label>
          Host:
          <input v-model="wsHost" type="text" />
        </label>
        <label>
          Port:
          <input v-model="wsPort" type="number" />
        </label>
        <button @click="handleProvision" class="btn-primary">Mulai Rekam</button>
      </div>
    </div>

    <div v-else-if="status === 'provisioned'" class="control-section">
      <div class="success-message">
        <p>✓ Perangkat berhasil dikonfigurasi!</p>
        <p>Rekaman akan segera dimulai...</p>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.device-control {
  background: white;
  border: 1px solid #016493;
  border-radius: 12px;
  padding: 1.5rem;
  color: #333;
}

h3 {
  color: #016493;
  margin-top: 0;
  margin-bottom: 1rem;
}

h4 {
  color: #016493;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.control-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.device-info {
  background: #f0f8ff;
  padding: 1rem;
  border-radius: 8px;
}

.device-info p {
  margin: 0.5rem 0;
}

.countdown {
  color: #e9b03f;
  font-weight: 600;
}

.passkey-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.passkey-form label {
  font-weight: 600;
  color: #016493;
}

.passkey-form input {
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1.2rem;
  text-align: center;
  letter-spacing: 0.5rem;
}

.provision-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.provision-form label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-weight: 600;
  color: #016493;
}

.provision-form input {
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.btn-primary {
  background-color: #016493;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #014a6e;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.success {
  color: #28a745;
  font-weight: 600;
}

.success-message {
  text-align: center;
  color: #28a745;
  padding: 2rem;
}

.success-message p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.error-message {
  background: #fff0f0;
  color: #c43408;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #c43408;
  margin-top: 1rem;
}
</style>
