/* 框架 */
const Layout = r => require.ensure([], () => r(require('@/views/layout/index.vue')), 'Layout')

// --------------------------------- 示例页面-start ----------------------------------------------
/* 表格页面 */
const Table = r => require.ensure([], () => r(require('@/views/exampleTemplate/table/index.vue')))
/* 上传文件 */
const Update = r => require.ensure([], () => r(require('@/views/exampleTemplate/update/index.vue')))
/* 图表 */
const Charts = r => require.ensure([], () => r(require('@/views/exampleTemplate/charts/index.vue')))
/* 表单 */
const Form = r => require.ensure([], () => r(require('@/views/exampleTemplate/form/index.vue')))
/* 按钮 */
const Button = r => require.ensure([], () => r(require('@/views/exampleTemplate/button/index.vue')))
/* 图标 */
const Icon = r => require.ensure([], () => r(require('@/views/exampleTemplate/icon/index.vue')))
/* 标签页 */
const Tabs = r => require.ensure([], () => r(require('@/views/exampleTemplate/tabs/index.vue')))
/* 弹框 */
const Dialog = r => require.ensure([], () => r(require('@/views/exampleTemplate/dialog/index.vue')))
/* 抽屉 */
const Drawer = r => require.ensure([], () => r(require('@/views/exampleTemplate/drawer/index.vue')))
/* 二级菜单 */
const Child = r => require.ensure([], () => r(require('@/views/exampleTemplate/child/index.vue')))
/* 进度条 */
const Progress = r => require.ensure([], () => r(require('@/views/exampleTemplate/progress/index.vue')))
/* 图片裁剪 */
const PictureCrop = r => require.ensure([], () => r(require('@/views/exampleTemplate/pictureCrop/index.vue')))
/* 日历 */
const Calendar = r => require.ensure([], () => r(require('@/views/exampleTemplate/calendar/index.vue')))
/* 时间抽 */
const TimeLine = r => require.ensure([], () => r(require('@/views/exampleTemplate/timeLine/index.vue')))
/* 步骤条 */
const Steps = r => require.ensure([], () => r(require('@/views/exampleTemplate/steps/index.vue')))
/* 树形控件 */
const TreeView = r => require.ensure([], () => r(require('@/views/exampleTemplate/treeView/index.vue')))
/* Socket */
const Socket = r => require.ensure([], () => r(require('@/views/exampleTemplate/socket/index.vue')))
// --------------------------------- 示例页面-end ----------------------------------------------

const exampleRouter = [
  {
    path: '/tableView',
    component: Layout,
    breadcrumb: false,
    children: [
      {
        path: 'tableView',
        component: Table,
        name: 'tableView',
        meta: { title: '表格', affix: true }
      }
    ]
  },
  {
    path: '/update',
    component: Layout,
    children: [
      {
        path: 'update',
        component: Update,
        name: 'update',
        meta: { title: '上传文件', affix: true }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    children: [
      {
        path: 'charts',
        component: Charts,
        name: 'charts',
        meta: { title: '图表', affix: true }
      }
    ]
  },
  {
    path: '/formView',
    component: Layout,
    children: [
      {
        path: 'formView',
        component: Form,
        name: 'formView',
        meta: { title: '表单', affix: true }
      }
    ]
  },
  {
    path: '/buttonView',
    component: Layout,
    children: [
      {
        path: 'buttonView',
        component: Button,
        name: 'buttonView',
        meta: { title: '按钮', affix: true }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'icon',
        component: Icon,
        name: 'icon',
        meta: { title: '图标', affix: true }
      }
    ]
  },
  {
    path: '/tabs',
    component: Layout,
    children: [
      {
        path: 'tabs',
        component: Tabs,
        name: 'tabs',
        meta: { title: '标签页', affix: true }
      }
    ]
  },
  {
    path: '/dialogView',
    component: Layout,
    children: [
      {
        path: 'dialogView',
        component: Dialog,
        name: 'dialogView',
        meta: { title: '弹框', affix: true }
      }
    ]
  },
  {
    path: '/drawer',
    component: Layout,
    children: [
      {
        path: 'drawer',
        component: Drawer,
        name: 'drawer',
        meta: { title: '抽屉', affix: true }
      }
    ]
  }, {
    path: '/progressView',
    component: Layout,
    children: [
      {
        path: 'progressView',
        component: Progress,
        name: 'progressView',
        meta: { title: '进度条', affix: true }
      }
    ]
  }, {
    path: '/pictureCrop',
    component: Layout,
    children: [
      {
        path: 'pictureCrop',
        component: PictureCrop,
        name: 'pictureCrop',
        meta: { title: '图片裁剪', affix: true }
      }
    ]
  }, {
    path: '/calendarView',
    component: Layout,
    children: [
      {
        path: 'calendarView',
        component: Calendar,
        name: 'calendarView',
        meta: { title: '日历', affix: true }
      }
    ]
  },
  {
    path: '/timeLine',
    component: Layout,
    children: [
      {
        path: 'timeLine',
        component: TimeLine,
        name: 'timeLine',
        meta: { title: '时间抽', affix: true }
      }
    ]
  }, {
    path: '/stepsView',
    component: Layout,
    children: [
      {
        path: 'stepsView',
        component: Steps,
        name: 'stepsView',
        meta: { title: '步骤条', affix: true }
      }
    ]
  }, {
    path: '/treeView',
    component: Layout,
    children: [
      {
        path: 'treeView',
        component: TreeView,
        name: 'treeView',
        meta: { title: '树形列表', affix: true }
      }
    ]
  },
  {
    path: '/child',
    component: Layout,
    children: [
      {
        path: 'child',
        component: Child,
        name: 'child',
        meta: { title: '二级菜单', affix: true }
      }
    ]
  }, {
    path: '/socket',
    component: Layout,
    children: [
      {
        path: 'socket',
        component: Socket,
        name: 'socket',
        meta: { title: 'Socket', affix: true }
      }
    ]
  }
]

export default exampleRouter
