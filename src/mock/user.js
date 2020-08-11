const routes = [
  {
    id: '183',
    code: 'tenant-sys',
    parent: null,
    name: '租户管理系统',
    url: '',
    icon: '',
    pic: null,
    level: 1,
    sort: 0,
    createTime: '2020-07-06 20:18:08',
    updateTime: '2020-07-06 20:18:08',
    status: 'Y',
    deleted: 'N',
    loadType: null,
    type: 0,
    description: '租户中专平台',
    route: 'tenent',
    serviceId: 'tenant',
    hasPermission: false,
    leaf: 'N',
    children: [
      {
        id: '186',
        parent: '183',
        name: '首页',
        route: 'home',
        icon: 'iconshouye1',
        serviceId: 'tenant'
      },
      //  {
      //   id: '186',
      //   parent: '183',
      //   name: '用户',
      //   icon: 'iconbiaoge',
      //   route: 'user',
      //   serviceId: 'tenant',
      //   children: null
      // },
      {
        id: '186',
        parent: '183',
        name: '表格',
        icon: 'iconbiaoge',
        route: 'tableView',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '上传',
        icon: 'iconxiazai',
        route: 'update',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '图表',
        icon: 'icontubiao1',
        route: 'charts',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '表单',
        icon: 'iconbiaodan',
        route: 'formView',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '按钮',
        icon: 'iconanniu',
        route: 'buttonView',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '图标',
        icon: 'icontubiao',
        route: 'icon',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '标签页',
        icon: 'iconshengqian',
        route: 'tabs',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '弹框',
        icon: 'icondankuang',
        route: 'dialogView',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '抽屉',
        icon: 'icondrawer',
        route: 'drawer',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '进度条',
        icon: 'iconxiaojuchang',
        route: 'progressView',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '图片裁剪',
        icon: 'icontupian',
        route: 'pictureCrop',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '日历',
        icon: 'iconrili1',
        route: 'calendarView',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '时间抽',
        icon: 'iconlayers',
        route: 'timeLine',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '步骤条',
        icon: 'iconicon_attestation',
        route: 'stepsView',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '树形控件',
        icon: 'icon-lumingpai',
        route: 'treeView',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: 'socket',
        icon: 'iconpinglun',
        route: 'socket',
        serviceId: 'tenant',
        children: null
      }, {
        id: '186',
        parent: '183',
        name: '二级菜单',
        icon: 'iconfanbei',
        route: 'child',
        serviceId: 'tenant',
        children: [
          {
            id: '186',
            parent: '183',
            name: '二级菜单',
            icon: 'iconfanbei',
            route: 'child',
            serviceId: 'tenant',
            children: null
          }
        ]
      }
    ]
  }
]

module.exports = [
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: routes
      }
    }
  }
]
