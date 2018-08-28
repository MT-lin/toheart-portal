import Layout from '@/views/layout'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '',
    name: 'initialize',
    component: () => import('@/views/initialize/index'),
    meta: { title: '初始化' }
  },
  {
    path: '',
    component: Layout,
    children: [{
      name: 'home',
      path: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: 'toheart' }
    }]
  }
]
const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
