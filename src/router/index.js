import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
// import constantRouterMap from './staticRoute'
import whiteList from './whiteList'
import store from '@/store'
// Vue.use(Router)
Vue.use(VueRouter)

// export default new Router({
//   routes:staticRoute,
//   mode: 'history'
// })
const Login = (resolve) => {
  import('@/pages/login/index').then((module) => {
    resolve(module)
  })
}
const Home = (resolve) => {
    import('@/pages/home/index').then((module) => {
      resolve(module)
    })
}
const Register = (resolve) => {
    import('@/pages/register/index').then((module) => {
      resolve(module)
    })
}
const Mange = (resolve) => {
    import('@/pages/manage/index').then((module) => {
      resolve(module)
    })
}
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/mange',
    name: 'mange',
    component: Mange
  }
]
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 路由跳转前验证
router.beforeEach((to, from, next) => {
  NProgress.start()
  // console.log(Auth.isLogin())
  // if (Auth.isLogin()) {
  // console.log(to.path, 'to path')
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          console.log(res.data.roles)
          const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            console.log(store.getters.addRouters, 'store.getters.addRouters')
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          // next({ path: '/' })
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    NProgress.done()
    // 如果是免登陆的页面则直接进入，否则跳转到登录页面
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('该页面无需登录即可访问')
      next()
    } else {
      console.warn('当前未处于登录状态，请登录')
      NProgress.done()
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
      // next({
      //   path: '/login',
      //   replace: true
      // })
    }
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export const asyncRouterMap = []
export default router
