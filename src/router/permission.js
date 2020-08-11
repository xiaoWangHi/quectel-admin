import router from './index'
import store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import i18n from '../i18n'
import getPageTitle from '../utils/get-page-title'

const message = i18n.messages[i18n.locale].menu
NProgress.configure({ showSpinner: false })

let flag = 0
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(message[to.meta.title])
  if(flag === 0) {
    try {
      const accessRoutes = await store.dispatch('permission/generateRoutes')
      router.addRoutes(accessRoutes)
      flag++
      next({ ...to, replace: true })
    } catch (error) {
      Message.error(error || 'Has Error')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
