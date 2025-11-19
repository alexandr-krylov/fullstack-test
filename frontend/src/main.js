import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
// import { useAuthStore } from './stores/auth'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')

