<script setup>
import { ref, watch, reactive } from 'vue'
import { useTaskStore } from '../stores/task'

const props = defineProps({
  task: { type: Object, default: null }
})

const emit = defineEmits(['saved', 'cancel'])
const taskStore = useTaskStore()

// Форма
const form = reactive({
  title: '',
  description: '',
  status: 'new',
  priority: 1,
  due_date: '',
  karada_project: 'karada_u',
})

const errors = ref({})

// При открытии компонента — если есть task, заполняем
watch(() => props.task, (task) => {
  if (task) {
    Object.assign(form, {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date ?? '',
      karada_project: task.karada_project,
    })
  } else {
    resetForm()
  }
  errors.value = {}
})

// Сброс
const resetForm = () => {
  Object.assign(form, {
    title: '',
    description: '',
    status: 'new',
    priority: 1,
    due_date: '',
    karada_project: 'karada_u',
  })
}

// Сохранение
const saveTask = async () => {
  try {
    errors.value = {}

    if (props.task) {
      await taskStore.updateTask(props.task.id, { ...form })
    } else {
      await taskStore.addTask({ ...form })
    }

    emit('saved')
    resetForm()

  } catch (e) {
    if (e.response && e.response.status === 422) {
      errors.value = e.response.data.errors
    } else {
      console.error(e)
      alert("Ошибка сервера")
    }
  }
}
</script>

<template>
  <div class="task-form">
    <div>
      <label>Title</label>
      <input v-model="form.title" type="text">
      <div v-if="errors.title" class="error">{{ errors.title[0] }}</div>
    </div>

    <div>
      <label>Description</label>
      <textarea v-model="form.description"></textarea>
      <div v-if="errors.description" class="error">{{ errors.description[0] }}</div>
    </div>

    <div>
      <label>Status</label>
      <select v-model="form.status">
        <option value="new">New</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
        <option value="archived">Archived</option>
      </select>
      <div v-if="errors.status" class="error">{{ errors.status[0] }}</div>
    </div>

    <div>
      <label>Priority</label>
      <input v-model.number="form.priority" type="number" min="1" max="5">
      <div v-if="errors.priority" class="error">{{ errors.priority[0] }}</div>
    </div>

    <div>
      <label>Due Date</label>
      <input v-model="form.due_date" type="date">
      <div v-if="errors.due_date" class="error">{{ errors.due_date[0] }}</div>
    </div>

    <div>
      <label>Karada Project</label>
      <select v-model="form.karada_project">
        <option value="karada_u">karada_u</option>
        <option value="prohuntr">prohuntr</option>
        <option value="other">other</option>
      </select>
      <div v-if="errors.karada_project" class="error">{{ errors.karada_project[0] }}</div>
    </div>

    <button @click="saveTask">
      {{ props.task ? 'Update' : 'Create' }}
    </button>

    <button @click="emit('cancel')">Cancel</button>
  </div>
</template>
