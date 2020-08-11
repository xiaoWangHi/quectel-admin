import { getRoutes } from '@/api/mock/user'
import { asyncRoutes, constantRoutes } from '@/router'

/* 框架 */
const Layout = r => require.ensure([], () => r(require('@/views/layout/index.vue')), 'Layout')

/**
 * 重新组装接口请求的路由
*/
function getRouterObj(data) {
  const obj = {}
  function go(data) {
    for (let i = 0; i < data.length; i++) {
      if(data[i] && data[i].name) {
        obj[data[i].name] = data[i]
      }
      if (data[i].children && data[i].children.length) {
        go(data[i].children)
      }
    }
  }
  go(data)
  return obj
}

function getConcatRouter(routerObj, data) {
  const arr = []
  if(!data || !data.length) {
    return arr
  }
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    if(routerObj[element.route]) {
      const obj = {
        path: '/' + element.route + index,
        meta: { title: element.route, icon: element.icon, breadcrumb: !!(element.children && element.children.length) },
        name: 'layout' + element.route,
        redirect: 'noRedirect',
        component: Layout,
        alwaysShow: !!(element.children && element.children.length),
        children: []
      }

      if(element.children && element.children.length) {
        for (let cIndex = 0; cIndex < element.children.length; cIndex++) {
          const child = element.children[cIndex]
          if(routerObj[child.route]) {
            const childItem = {
              path: '/' + child.route,
              name: child.route,
              meta: { title: child.route, icon: child.icon },
              component: routerObj[child.route].component
            }
            obj.children.push(childItem)
          }
        }
      } else {
        obj.children = [
          {
            path: '/' + element.route,
            name: element.route,
            meta: { title: element.route, icon: element.icon },
            component: routerObj[element.route].component
          }
        ]
      }
      arr.push(obj)
    }
  }
  return arr
}
/**
 * 获取路由
*/
export function filterAsyncRoutes(routes) {
  const routerObj = getRouterObj(asyncRoutes)
  const res = getConcatRouter(routerObj, routes)
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getRoutes().then(res => {
        const accessedRoutes = res.data && res.data.length ? filterAsyncRoutes(res.data[0].children || []) : []
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
