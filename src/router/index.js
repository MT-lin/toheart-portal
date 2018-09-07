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
      meta: {title: 'toheart'}
    }]
  },
  {
    path: 'story',
    component: Layout,
    children: [{
      name: 'story/show',
      path: '/story/show',
      query: ':id',
      component: () => import('@/views/story/show/index'),
      meta: {title: '精彩故事'}
    }]
  },
  {
    path: 'story',
    component: Layout,
    children: [{
      name: 'story/home',
      path: '/story/home',
      component: () => import('@/views/story/home/index'),
      meta: {title: 'toheart故事首页'}
    }]
  },
  {
    path: 'story',
    component: Layout,
    children: [{
      name: 'story/write',
      path: '/story/write',
      component: () => import('@/views/story/write/index'),
      meta: {title: '讲故事-toheart'}
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
