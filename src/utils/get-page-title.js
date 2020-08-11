// import defaultSettings from '../../public/config.js'

const title = window.config ? window.config.projectName : '平台管理'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
