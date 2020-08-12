import Vue from 'vue'
import Router from 'vue-router'

import ExampleRouter from './exampleRouter'

Vue.use(Router)

/* 登录 */
const Login = r => require.ensure([], () => r(require('@/views/login/index.vue')), 'login')

/* 框架 */
const Layout = r => require.ensure([], () => r(require('@/views/layout/index.vue')), 'Layout')

/* 首页 */
const Home = r => require.ensure([], () => r(require('@/views/home/index.vue')), 'home')

/* 重定向 */
const Redirect = r => require.ensure([], () => r(require('@/views/redirect/index.vue')))

/* 404 */
const Error_404 = r => require.ensure([], () => r(require('@/views/error-page/404.vue')))

/* 403 */
const Error_403 = r => require.ensure([], () => r(require('@/views/error-page/403.vue')))

/* 401 */
const Error_401 = r => require.ensure([], () => r(require('@/views/error-page/401.vue')))

/**
 *
 * hidden: true        是否出现在侧边
 * alwaysShow: true    这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect    面包屑中不可点击
 * name    必填
 * meta : {
    title: 'title'
    icon:
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  若果设置为true，它则会固定在tags-view中(默认 false)
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  }
 */

/**
 * 默认路由
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: Redirect
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  // {
  //   path: '*',
  //   hidden: true,
  //   redirect: '/'
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
        meta: { title: 'home', affix: true }
      }
    ]
  }, {
    path: '/404',
    component: Error_404,
    hidden: true
  }, {
    path: '/403',
    component: Error_403,
    hidden: true
  }, {
    path: '/401',
    component: Error_401,
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
        meta: { title: '首页', affix: true }
      }
    ]
  },
  ...ExampleRouter
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
