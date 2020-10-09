const config = window.config
import { parseTime } from '../../utils/filters'
const globals = {
  state: {
    height: window.innerHeight,
    width: window.innerWidth,
    date: parseTime(new Date().getTime()),
    theme: localStorage.getItem('theme') || 'theme1',
    config: config,
    IE9: navigator.userAgent.indexOf('MSIE 9.0') > -1,
    isIE: !!window.ActiveXObject || 'ActiveXObject' in window,
    upBtn: true,
    isBreadCrumb: true,
    isCollapse: true,
    mode: 'vertical'
  },
  mutations: {
    setMsec: (state, msec) => {
      state.msec = msec
    },
    SET_BREADCRUMB: (state, show) => {
      state.isBreadCrumb = show
    },
    classify: (state, court) => {
      state.classify = court
    },
    setHeight: state => {
      state.height = window.innerHeight
      state.width = window.innerWidth
      state.size = state.height * state.width
    },
    setTheme: (state, theme) => {
      state.theme = theme
    },
    SET_UP_BTN: (state, status) => {
      state.upBtn = status
    },
    SET_IS_COLLAPSE: (state, collapse) => {
      state.isCollapse = collapse
    },
    SET_MODE: (state, mode) => {
      state.mode = mode
    }
  },
  actions: {
    // 是否需要面包屑
    setBreadCrumb({ commit }, state) {
      commit('SET_BREADCRUMB', state)
    },
    // 是否回到顶层
    setUpBtn({ commit }, status) {
      commit('SET_UP_BTN', status)
    },
    WindowResize({ commit }) {
      commit('setHeight')
    },
    GetTheme({ commit }) {
      commit('setTheme')
    },
    setCollapse({ commit }, state) {
      commit('SET_IS_COLLAPSE', state)
    },
    setMode({ commit }, mode) {
      commit('SET_MODE', mode)
    }
  }
}

export default globals
