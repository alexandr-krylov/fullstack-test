import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async register(data) {
            const res = await axios.post('/register', data)
            this.user = res.data.user
            this.token = res.data.token
            localStorage.setItem('token', this.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        },
        async login(data) {
            const res = await axios.post('/login', data)
            this.user = res.data.user
            this.token = res.data.token
            localStorage.setItem('token', this.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        },
        async logout() {
            try {
                await axios.post('/logout', {})
            } catch (e) {
                if (e.response?.status !== 401) {
                    console.error(e)
                }
            }
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        },
        async fetchUser() {
            if (!this.token) {
                this.user = null
                return
            }
            try {
                const res = await axios.get('/user')
                this.user = res.data
            } catch (e) {
                if (e.response?.status === 401) {
                    this.user = null
                    this.token = null
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    return
                }
                throw e
            }
        }
    }
})
