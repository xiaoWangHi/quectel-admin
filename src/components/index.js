// 列表
const ToDoList = () => import('./TodoList')

// 搜索
const Search = () => import('./HeaderSearch')

// 表格
const FormTemplate = () => import('./formTemplate')

// 单行省略
const EllipsisView = () => import('./ellipsisView')

// tabs页面
const IndexTabs = () => import('./indexTabs')

// 表单弹框
const FormDialog = () => import('./formDialog')

// 柱状图
const BarChart = () => import('./BarChart')

// Chart
const Chart = () => import('./charts')

// 上传文件
const UpLoad = () => import('./upload')

// 数字滚动组件
const CountTo = () => import('./countTo')

// 面包屑
const BreadCrumb = () => import('./Breadcrumb')

// 图片编辑
const Cropper = () => import('./cropper')

// 日历
const Calendar = () => import('./Calendar')

// 日历Item
const CalendarItem = () => import('./Calendar/calendarItem.vue')

// 提示
const Tips = () => import('./Tips')

// 步骤条
const Steps = () => import('./Steps')

// 树形控件
const TreeList = () => import('./treeList')

// 输入框tree
const InputTree = () => import('./inputTree')

module.exports = {
  ToDoList,
  Search,
  FormTemplate,
  EllipsisView,
  IndexTabs,
  FormDialog,
  BarChart,
  Chart,
  UpLoad,
  CountTo,
  BreadCrumb,
  Cropper,
  Calendar,
  CalendarItem,
  Tips,
  Steps,
  TreeList,
  InputTree
}
