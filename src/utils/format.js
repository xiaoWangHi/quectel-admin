import i18n from '../i18n'
/**
 * 获取当前周几
*/
const getWeekDate = (date) => {
  const message = i18n.messages[i18n.locale].date
  const now = date ? new Date(date) : new Date()
  const day = now.getDay()
  const weeks = [message.Sunday, message.Monday, message.Tuesday, message.Wednesday, message.Thursday, message.Friday, message.Saturday]
  const week = weeks[day]
  return week
}

/**
 * 获取指定时间的前后N天
 * day 正数表示后N天  负数表示前N天
 **/
const getPrevNextDate = (date, day) => {
  var dd = new Date(date)
  dd.setDate(dd.getDate() + day)
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
  return y + '-' + m + '-' + d
}

/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
const getPreMonth = (date) => {
  var arr = date.split('-')
  var year = arr[0] // 获取当前日期的年份
  var month = arr[1] // 获取当前日期的月份
  var day = arr[2] // 获取当前日期的日
  // var days = new Date(year, month, 0).getDate()
  // days = days // 获取当前日期中月的天数
  var year2 = year
  var month2 = parseInt(month) - 1
  if (month2 === 0) {
    year2 = parseInt(year2) - 1
    month2 = 12
  }
  var day2 = day
  var days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  var t2 = year2 + '-' + month2 + '-' + day2
  return t2
}

/**
 * 获取下一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
const getNextMonth = (date) => {
  var arr = date.split('-')
  var year = arr[0] // 获取当前日期的年份
  var month = arr[1] // 获取当前日期的月份
  var day = arr[2] // 获取当前日期的日
  // var days = new Date(year, month, 0)
  // days = days.getDate() // 获取当前日期中的月的天数
  var year2 = year
  var month2 = parseInt(month) + 1
  if (month2 === 13) {
    year2 = parseInt(year2) + 1
    month2 = 1
  }
  var day2 = day
  var days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  var t2 = year2 + '-' + month2 + '-' + day2
  return t2
}

/**
 *
 * @param {*} today
 */
const getDateYMD = (today) => {
  const date = today ? new Date(today) : new Date()
  let day = ''
  if (today) {
    day = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() - 1 < 10 ? '0' : ''}${date.getDate() - 1}`
  } else {
    day = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
  }
  return day
}

export default {
  getWeekDate,
  getPrevNextDate,
  getPreMonth,
  getNextMonth,
  getDateYMD
}
