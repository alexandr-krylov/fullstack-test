import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        csrfLoaded: false,
    }),
    actions: {
        async ensureCsrf() {
            if (!this.csrfLoaded) {
                await axios.get('/sanctum/csrf-cookie')
                this.csrfLoaded = true
            }
        },
        async register(data) {
            await this.ensureCsrf()
            const res = await axios.post('/api/register', data)
            this.user = res.data.user
        },
        async login(data) {
            await this.ensureCsrf()
            const res = await axios.post('/api/login', data)
            this.user = res.data.user
        },
        async logout() {
            await this.ensureCsrf()
            await axios.post('/api/logout', {})
            this.user = null
        },
        async fetchUser() {
            try {
                await this.ensureCsrf()
                const res = await axios.get('/api/user')
                this.user = res.data
            } catch (e) {
                if (e.response && e.response.status === 401) {
                    this.user = null
                } else {
                    throw e
                }
            }
        }
    }
})
