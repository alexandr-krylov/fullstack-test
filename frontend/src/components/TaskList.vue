<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'
import TaskForm from './TaskForm.vue'

const taskStore = useTaskStore()
const editingTask = ref(null)
const showForm = ref(false)
const loading = ref(false)

const fetchTasks = async () => {
  loading.value = true
  try {
    await taskStore.fetchTasks()
  } finally {
    loading.value = false
  }
}

const createTask = () => {
  editingTask.value = null
  showForm.value = true
}

const editTask = (task) => {
  editingTask.value = task
  showForm.value = true
}

const deleteTask = async (task) => {
  if (!confirm('Удалить задачу?')) return
  try {
    await taskStore.deleteTask(task.id)
  } catch {
    alert('Ошибка при удалении')
  }
}

onMounted(fetchTasks)
</script>

<template>
  <div class="task-card">
    <h1>Мои задачи</h1>
    <button @click="createTask" class="btn btn-primary">Создать задачу</button>

    <TaskForm 
      v-if="showForm" 
      :task="editingTask" 
      @saved="() => { fetchTasks(); showForm=false }" 
      @cancel="() => showForm=false" 
    />

    <div v-if="loading">Загрузка...</div>

    <table v-if="!loading" class="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Due Date</th>
          <th>Karada Project</th>
          <th>Importance Score</th>
          <th>Karada Test Label</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in taskStore.tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.priority }}</td>
          <td>{{ task.due_date?.slice(0, 10) || '-' }}</td>
          <td>{{ task.karada_project }}</td>
          <td>{{ task.importance_score }}</td>
          <td>{{ task.karada_test_label }}</td>
          <td>
            <button @click="editTask(task)" class="btn btn-secondary">Edit</button>
            <button @click="deleteTask(task)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
