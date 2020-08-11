import { getToken, removeToken } from '@/utils/auth'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
  }
}

const actions = {

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USER_INFO', {})
      removeToken()
      resolve()
    })
  }
  // async changeRoles({ commit, dispatch }, role) {
  //   const token = role + '-token'

  //   commit('SET_TOKEN', token)
  //   setToken(token)

  //   const { roles } = await dispatch('getInfo')

  //   resetRouter()

  //   const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
  //   router.addRoutes(accessRoutes)
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
