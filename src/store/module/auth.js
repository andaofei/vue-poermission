/**
 * Created by 23535 on 2018/8/1.
 */

import axios from 'axios'
// import Cookies from 'js-cookie'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken(),
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  login({commit}, payload) {
    console.log(payload)
    return axios.get(`/apis/v2/movie/in_theaters`).then((res) => {
      if (res.status === 200) {
        // console.log(res.data)
        setToken(res.data.title) // 登录成功后将token存储在cookie之中
        commit('SET_TOKEN', res.data.title)
      }
      return res
    })
      .catch((req) => {
        console.log(req)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
