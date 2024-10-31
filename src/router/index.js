import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/pages/Register.vue'
import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import Perfil from '@/pages/Perfil.vue'
import Atividades from '@/pages/Atividades.vue'
import Historico from '@/pages/Historico.vue'

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
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil,
      meta: { requiresAuth: true }
    },
    {
      path: '/atividades',
      name: 'Atividades',
      component: Atividades,
      meta: { requiresAuth: true }
    },
    {
      path: '/historico',
      name: 'Historico',
      component: Historico,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwtToken');

  if (to.meta.requiresAuth && !token) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router
