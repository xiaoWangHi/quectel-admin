/**
 *  菜单中文
*/
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 引入element语言包
const cn = {
  menu: {
    '/': '首页',
    home: '首页',
    user: '用户',
    tableView: '表格',
    update: '上传',
    charts: '图表',
    formView: '表单',
    buttonView: '按钮',
    icon: '图标',
    tabs: '标签页',
    dialogView: '对话框',
    drawer: '抽屉',
    progressView: '进度条',
    child: '二级菜单',
    pictureCrop: '图片裁剪',
    calendarView: '日历',
    timeLine: '时间轴',
    stepsView: '步骤条',
    treeView: '树形控件',
    socket: '即时通讯'
  },
  ...zhLocale
}
export default cn
