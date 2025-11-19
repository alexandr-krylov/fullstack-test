<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter, useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>

<template>
  <div id="app">
    <header class="topbar">
      <div class="logo">KARADA Tasks</div>

      <div class="current-user" v-if="auth.user">
        {{ auth.user.name }}
      </div>

      <button 
        v-if="auth.user"
        @click="logout"
        class="logout-btn"
      >
        Logout
      </button>
    </header>
    <div class="breadcrumbs">
      KARADA Tasks
      <span v-if="route.meta?.title"> / {{ route.meta.title }}</span>
    </div>
    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ─────────────── TOP BAR ─────────────── */

.topbar {
  width: 100vw; /* важное — на всю ширину */
  max-width: 100%; /* чтобы не было скролла */
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #4f46e5;
  color: white;

  padding: 0.8rem 1.5rem;
  font-size: 1.4rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);

  box-sizing: border-box; /* чтобы padding не расширял блок */
}

.breadcrumbs {
  width: 100%;
  font-size: 1.1rem;
  color: #555;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

/* Название */
.logo {
  font-weight: 600;
}

/* Имя пользователя */
.current-user {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Logout кнопка */
.logout-btn {
  background-color: #ef4444;
  border: none;
  padding: 0.4rem 1rem;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}
.logout-btn:hover {
  background-color: #dc2626;
}

/* ─────────────── CONTENT ─────────────── */
.app-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
