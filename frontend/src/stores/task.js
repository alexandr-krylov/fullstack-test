import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async fetchTasks() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      const res = await axios.get('/tasks');
      this.tasks = res.data;
    },
    async addTask(data) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      const res = await axios.post('/tasks', data);
      this.tasks.push(res.data);
    },
    async updateTask(id, data) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      const res = await axios.put(`/tasks/${id}`, data);
      const index = this.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        this.tasks[index] = res.data;
      }
    },
    async deleteTask(id) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      await axios.delete(`/tasks/${id}`);
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
});
