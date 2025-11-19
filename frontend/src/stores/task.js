import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth.js';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async ensureCsrf() {
      const auth = useAuthStore()
      await auth.ensureCsrf()
    },
    async fetchTasks() {
      await this.ensureCsrf()
      const res = await axios.get('/api/tasks');
      this.tasks = res.data;
    },
    async addTask(data) {
      await this.ensureCsrf()
      const res = await axios.post('/api/tasks', data);
      this.tasks.push(res.data);
    },
    async updateTask(id, data) {
      await this.ensureCsrf()
      const res = await axios.put(`/api/tasks/${id}`, data);
      const index = this.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        this.tasks[index] = res.data;
      }
    },
    async deleteTask(id) {
      await this.ensureCsrf()
      await axios.delete(`/api/tasks/${id}`);
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
});
