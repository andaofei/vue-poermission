/**
 * Created by 23535 on 2018/8/1.
 */
import Cookies from 'js-cookie'
const authToken = {
  // getNewToken  每次请求时判断Token是否超时，若超时则获取新Token (推荐)
  tokenTimeoutMethod: 'getNewToken',

  // 在Cookie中记录登录状态的key
  loginKey: 'Admin-Token',

  // Token是否超时
  hasToken () {
    return Cookies.get('token')
  },

  // 当前是否是登录状态
  isLogin () {
    // console.log(this.loginKey)
    return Cookies.get(this.loginKey)
  },

  // 设置Token
  setToken (token) {
    // TODO: 设置token，并填写有效期
    let maxAge = new Date(new Date().getTime() + 30 * 1000 * 60)
    Cookies.set(this.loginKey, token, {
      expires: maxAge
    })
  },
  getToken () {
    return Cookies.get(this.loginKey)
  },
  // 设置登录状态
  setLoginStatus () {
    // TODO: 设置超时登录时间，在该时间范围内没有任何请求操作则自动删除
    console.log('登录状态最长时间更新')
    let maxAge = new Date(new Date().getTime() + 30 * 60 * 1000)
    Cookies.set(this.loginKey, 'true', {
      expires: maxAge
    })
  },

  // 移除Token
  removeToken () {
    Cookies.remove(this.loginKey)
  },

  // 移除登录状态
  removeLoginStatus () {
    Cookies.remove(this.loginKey)
  }
}

export default authToken
