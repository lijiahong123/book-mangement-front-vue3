import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/Layout/Home.vue'
import { useUserStore } from '@/stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect: 'home',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (to.name === 'login' || to.name === 'register') {
    if (store.userId) {
      return next('/')
    }
    return next()
  } else {
    if (!store.userId) {
      return next('/login')
    }
    return next()
  }
})

export default router
