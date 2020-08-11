import Cookies from 'js-cookie'
const TokenKey = 'authorization'
const RefreshTokenKey = 'admin_refresh'
const systemKey = window.config ? window.config.systemKey : 'system'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}
export function removeCookieRoutes() {
  return Cookies.remove('routes')
}
export function getLocalStorage(key) {
  const obj = JSON.parse(localStorage.getItem(systemKey)) || {}
  return obj[key] || ''
}

export function setLocalStorage(key, value) {
  const obj = JSON.parse(localStorage.getItem(systemKey)) || {}
  obj[key] = value
  localStorage.setItem(systemKey, JSON.stringify({ [key]: obj }))
}

export function clearLocalStorage() {
  localStorage.setItem(systemKey, '{}')
}
// 模拟增加路由
export function mergeMockRoutes(cookieRoutes, accessedMap) {
  const cookies = Cookies.get()
  const user = cookies.admin ? 'admin' : 'client'
  if (!cookieRoutes) return {}
  if (cookieRoutes.permissionType === user) return cookieRoutes
  return {}
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
