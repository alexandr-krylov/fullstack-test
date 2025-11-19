<template>
    <TaskList />
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

<style>
/* === CARD CONTAINER === */
.task-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* === TABLE OF TASKS === */
.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.task-table th {
  text-align: left;
  font-weight: 600;
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 2px solid #ddd;
}

.task-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.task-table tr:hover {
  background: #fafafa;
}

/* === BUTTONS === */
.btn {
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  color: white;
  font-size: 0.95rem;
}

.btn-primary {
  background: #4f46e5;
}
.btn-primary:hover {
  background: #4338ca;
}

.btn-danger {
  background: #ef4444;
}
.btn-danger:hover {
  background: #dc2626;
}

.btn-secondary {
  background: #6b7280;
}
.btn-secondary:hover {
  background: #4b5563;
}

/* === FORM === */
.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 3px rgba(79, 70, 229, 0.4);
}

/* === ERROR MESSAGE === */
.error {
  color: #b91c1c;
  font-size: 0.9rem;
  margin-top: 4px;
}
</style>
