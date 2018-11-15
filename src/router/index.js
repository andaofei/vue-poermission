import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../util/auth'
import staticRoute from './staticRoute'
import whiteList from './whiteList'
import store from '@/store'
// Vue.use(Router)
Vue.use(VueRouter)

// export default new Router({
//   routes:staticRoute,
//   mode: 'history'
// })

const router = new VueRouter({
  mode: 'hash',
  routes: staticRoute
})

// 路由跳转前验证
router.beforeEach((to, from, next) => {
  console.log(to.path, 'to path')
  if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
    // store.dispatch('GetInfo').then(res => { // 拉取user_info
    //   const roles = res.data.role
    //   next()// resolve 钩子
    // })
    next()
  } else {
    // 如果是免登陆的页面则直接进入，否则跳转到登录页面
    if (whiteList.indexOf(to.path) >= 0) {
      console.log('该页面无需登录即可访问')
      next()
    } else {
      console.warn('当前未处于登录状态，请登录')
      next({ path: '/login', replace: true })
    }
  }
})
// router.beforeEach((to, from, next) => {
//   if (Auth.isLogin()) {
//     console.log(to.path, 'to path')
//     if (to.path === '/login') {
//       next({ path: '/home', replace: true })
//     } else if (to.path.indexOf('/error') >= 0) {
//       next()
//     } else {
//       next()
//     }
//   } else {
//     // 如果是免登陆的页面则直接进入，否则跳转到登录页面
//     if (whiteList.indexOf(to.path) >= 0) {
//       console.log('该页面无需登录即可访问')
//       next()
//     } else {
//       console.warn('当前未处于登录状态，请登录')
//       next({ path: '/login', replace: true })
//     }
//   }
// })

export default router
