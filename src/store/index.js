/**
 * Created by 23535 on 2018/8/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/auth'
import lang from './module/lang'
import permission from './module/permission'
import createLogger from 'vuex/dist/logger'//    调试
import process from 'process'
import getters from './getters'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: debug, // 启动调试严格模式
  plugins: debug ? [createLogger()] : [],
  modules: {
    user,
    lang,
    permission
  },
  getters
})
