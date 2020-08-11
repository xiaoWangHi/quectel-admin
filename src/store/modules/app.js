import Cookies from 'js-cookie'

const state = {
  menuActive: '/',
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  SET_MENU_ACTIVE: (state, active) => {
    state.menuActive = active
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  setMenuActive({ commit }, active) {
    commit('SET_MENU_ACTIVE', active)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
