import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'

const routes = [
  { path: '/login', component: Login, meta: { title: 'Login' } },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true, title: 'Dashboard' } },
  { path: '/register', component: Register, meta: { title: 'Register' }  },
  { path: '/', redirect: '/dashboard' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  
  if (!auth.user) {
    await auth.fetchUser()
  }

  const isLoggedIn = !!auth.user

  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/login'
  }

  if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
    return '/dashboard'
  }
})

export default router
