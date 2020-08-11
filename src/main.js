import Vue from 'vue'
import App from './App.vue'
import '../theme/index.css'
import '../element-variables.scss'
import './assets/styles/index.scss'
import Mixin from './mixins'
import router from './router'
import './router/permission' // permission control
import store from './store'
import './plugins'
// 全局filter
import * as filters from 'utils/filters'
import i18n from './i18n'

import 'lib-flexible/flexible'

import VueParticles from 'vue-particles' // 动态背景
Vue.use(VueParticles)

import socket from '@/api/socket'
Vue.use(socket)

Vue.config.productionTip = false

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// if (process.env.NODE_ENV === 'production') {
const { mockXHR } = require('./mock')
mockXHR()
// }

Vue.mixin(Mixin)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
