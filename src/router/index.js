import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: require('@/views/index.vue').default
  },
  {
    path: '/about',
    component: require('@/views/about.vue').default
  },
  {
    path: '/test',
    component: require('@/views/test.vue').default
  },
  {
    path: '/api',
    component: require('@/views/api.vue').default
  },
  {
    path: '/apits',
    component: require('@/views/apits.vue').default
  },
  {
    path: '/axiosTest',
    component: require('@/views/axiosTest.vue').default
  },
  {
    path: '/saveClick',
    component: require('@/views/saveClick.vue').default
  },
  {
    path: '/:catchAll(.*)',
    component: require('@/views/404.vue').default
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
