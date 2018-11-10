import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: () => import('@/components/blog/BlogList.vue')
    }, {
      path: '/post',
      name: 'post',
      meta: { needLogin: true },
      component: () => import('@/components/blog/BlogPost.vue')
    }, {
      path: '/posts/i',
      name: 'postid',
      component: () => import('@/components/blog/BlogDetail.vue')
    }, {
      path: '/posts/edit',
      name: 'edit',
      meta: { needLogin: true },
      component: () => import('@/components/blog/BlogEdit.vue')
    }, {
      path: '/users',
      name: 'users',
      meta: { needLogin: true },
      component: () => import('@/components/user/UserList.vue')
    }, {
      path: '/me',
      name: 'me',
      meta: { needLogin: true },
      component: () => import('@/components/user/MyBlog.vue')
    }, {
      path: '/person',
      name: 'person',
      meta: { needLogin: true },
      component: () => import('@/components/user/UserInfo.vue')
    }
  ]
})

// 路由钩子
router.beforeEach((to, from, next) => {
  if(!to.meta.needLogin) return next()
  let token = sessionStorage.getItem('token')
  if (!token) {
    // 若本地token不存在 跳转到首页  TODO
    Vue.prototype.$message({ message: '请先登录' })
    next('/')
  } else {
    next()
  }
})

export default router