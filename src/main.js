// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/index'
import VueLazyload from 'vue-lazyload'
import './config/config'
import './icons'
import i18n from './lang'
import './mock' // simulation data
import './commom/element-color/element-variables.scss' // 自定义颜色
import './commom/scss/index.scss'
// Vue.use(ElementUI)
Vue.prototype.$axios = axios

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(Element, {
  // size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueLazyload, {
  loading: require('../static/default/loading.svg'), // 加载的图片
  error: require('../static/default/bpm.jpg')
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
