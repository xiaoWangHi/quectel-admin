// 头部
const HrHeader = () => import('./header')

// 头部
// const HrHeader = () => import('./header')

// 菜单栏
const HrMenu = () => import('./menu')

// 内容栏
const HrMain = () => import('./main')

// 快速导航
const TagsView = () => import('./TagsView')

// 设置
const SettingView = () => import('./settingView')

module.exports = {
  HrHeader,
  HrMenu,
  HrMain,
  TagsView,
  SettingView
}
