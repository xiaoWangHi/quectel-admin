import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import creatPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const storeState = store => {
  store.subscribe((mutation) => {
    switch (mutation.type) {
      default: break
    }
  })
}

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [storeState, creatPersistedState({
    storage: window.localStorage
  })]
})

export default store
