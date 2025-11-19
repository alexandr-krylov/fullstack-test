<template>
  <div class="dashboard-card">
    <TaskList />
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import TaskList from '../components/TaskList.vue'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>
<!-- <template>
  <div class="page">
    <h1>Мои задачи</h1>
    <TaskList />
  </div>
</template> -->
<style scoped>
.dashboard-card {
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
  margin-top: 2rem; /* отступ сверху от h2 */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dashboard-card button {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard-card button:hover {
  background-color: #b91c1c;
}
</style>
