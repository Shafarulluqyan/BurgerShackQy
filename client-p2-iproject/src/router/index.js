import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView
    },
    {
      name: 'menu',
      path: '/menu',
      component: MenuView
    },

    {
      name: 'login',
      path: '/login',
      component: LoginView
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterView
    },
    {
      name: 'cart',
      path: '/cart',
      component: CartView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.access_token

  if ((to.name === 'cart' || to.name === 'menu') && !isAuthenticated) {
    next('/login')
  } else if (to.name === 'login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
