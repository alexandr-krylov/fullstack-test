<template>
  <form @submit.prevent="submit">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/dashboard')
  } catch (e) {
    alert(e.response.data.message)
  }
}
</script>
