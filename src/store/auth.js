/**
 * Created by 23535 on 2018/8/1.
 */
const state = {
  user: '',
  pass: ''
}

const mutations = {}

const actions = {
  login ({commit}, payload) {
    return new Promise((resolve) => {
      console.log(resolve)
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}
