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
            await axios.post('/logout', {})
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
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            const res = await axios.get('/user')
            this.user = res.data
        }
    }
})
