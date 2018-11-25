import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import '@/commom/nprogress/nprogress.css'// progress bar style
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
const Layout = (resolve) => {
  import('@/pages/home/index').then((module) => {
    resolve(module)
  })
}
export const constantRouterMap = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/pages/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/pages/login/authredirect'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/pages/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/pages/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// permission judge function
function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
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
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
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
export default router
export const asyncRouterMap = [
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/pages/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/pages/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
