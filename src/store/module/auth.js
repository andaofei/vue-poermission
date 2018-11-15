/**
 * Created by 23535 on 2018/8/1.
 */
import axios from 'axios'
// import {
//   getToken,
//   setToken
// } from '@/utils/auth'
import Auth from '@/util/auth'
import { loginByUsername, getUserInfo } from '@/api/login'
const state = {
  token: Auth.getToken(),
  roles: [],
  avatar: '',
  introduction: '',
  status: '',
  setting: '',
  name: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_SETTING: (state, setting) => {
    state.setting = setting
  },
  SET_STATUS: (state, status) => {
    state.status = status
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      loginByUsername(username, userInfo.password).then(response => {
        const data = response.data
        console.log(data)
        commit('SET_TOKEN', data.token)
        Auth.setToken(response.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // login({
  //   commit
  // }, payload) {
  //   return axios.get(`/apis/v2/movie/in_theaters`).then((res) => {
  //       if (res.status === 200) {
  //         console.log(res.data.title)
  //         commit('SET_TOKEN', res.data.title)
  //         Auth.setToken(res.data.title) // 登录成功后将token存储在cookie之中
  //       }
  //       return res
  //     })
  //     .catch((req) => {
  //       console.log(req)
  //     })
  // },
  // 获取用户信息
  GetUserInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(response => {
        if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
          reject('error')
        }
        const data = response.data
        console.log(data)
        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.roles)
        } else {
          reject('getInfo: roles must be a non-null array !')
        }

        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        commit('SET_INTRODUCTION', data.introduction)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  LogOut({
    commit,
    state
  }) {
    Auth.removeToken()
    commit('SET_TOKEN', '')
  }
}

export default {
  state,
  mutations,
  actions
}
