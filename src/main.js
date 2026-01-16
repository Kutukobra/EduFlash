import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import axios from "axios";

const app = createApp(App);

app.use(router);

app.mount("#app");

axios.defaults.baseURL = "http://localhost:3001/api/v1";

// Set AI microservice base URL as a global config
window.AI_SERVICE_URL = "http://localhost:3000";