import { createRouter, createWebHashHistory } from 'vue-router'
import { site_name } from '../site_config.json'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  //history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: `${site_name} - Home`,
      },
    },
    {
      path: '/snake',
      name: 'snake',
      component: () => import('../views/SnakeView.vue'),
      meta: {
        title: `${site_name} - Snake`,
      },
    },
    {
      path: '/sokoban',
      name: 'sokoban',
      component: () => import('../views/SokobanView.vue'),
      meta: {
        title: `${site_name} - Sokoban`,
      },
    },
  ],
})

router.beforeEach((to, from) => {
  document.title = (to.meta.title as string) || (site_name as string)
})

export default router
