/**
 * Created by 23535 on 2018/8/1.
 */
import axios from 'axios'
import authToken from '../util/auth'
// import {Message} from 'element-ui'
// 拦截请求
axios.interceptors.request.use(
  config => {
    // authToken.setLoginStatus()
    // console.log(config, '响应数据')
    return config
  },
  err => {
    // console.log(err)
    return Promise.reject(err)
  })

// 拦截相应
axios.interceptors.response.use(
  response => {
    // authToken.setLoginStatus()
    // console.log(response, '响应正确')
    return response
  },
  error => {
    // console.log(error, '响应错误拦截')
    return Promise.reject(error.response.data)
  })
