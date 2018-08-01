/**
 * Created by 23535 on 2018/8/1.
 */
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
const staticRoute = [
  {
    path: '/',
    redirect: '/login'
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
export default staticRoute
