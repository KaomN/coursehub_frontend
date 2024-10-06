import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import(/* webpackChunkName: "courses" */ '@/views/CoursesView.vue')
  },
  {
    path: '/mycourses',
    name: 'mycourses',
    component: () => import(/* webpackChunkName: "mycourses" */ '@/views/MyCoursesView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
