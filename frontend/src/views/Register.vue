<template>
  <form @submit.prevent="submit">
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <input v-model="password_confirmation" type="password" placeholder="Confirm Password" />

    <button type="submit">Register</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
    router.push('/dashboard')
  } catch (e) {
    alert(e.response?.data?.message || 'Registration error')
  }
}
</script>
