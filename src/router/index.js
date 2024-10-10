import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/pages/Register.vue'
import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import Perfil from '@/pages/Perfil.vue'
import Atividades from '@/pages/Atividades.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/atividades',
      name: 'Atividades',
      component: Atividades
    },
  ]
})

export default router
