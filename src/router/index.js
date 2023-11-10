import { createRouter, createWebHistory } from 'vue-router'
import {usePersonInfoStore} from '../stores/personsInfo'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/character',
    name: 'character',
    component: () => import(/* webpackChunkName: "character" */ '../views/Character.vue')
  },
  {
    path: '/episode',
    name: 'episode',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "episode" */ '../views/Episode.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to) => {
  if (to.meta.requiresAuth && !PersonInfoStore.isLoggedIn) return '/login'
})

export default router
