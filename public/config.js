window.config = {
  loginName: '管理系统', // 登录页面
  projectName: '管理系统', // 系统左上角显示名称
  title: '平台管理系统', // 浏览器title
  phone: '联系电话：123',
  website: 'https://www.quectel.com/cn/',
  systemKey: 'platform', // 对应数据库中uaa resource表中project_code字段,系统管理需要获取所有内容，故字段为空
  tenantKey: 'tenant', // 租户登录 查询资源传 'tenant'
  uaa_url: '/uaa/', // uaa服务注册的服务名
  uc_url: '/uc/', // 用户信息服务
  org_url: '/org/',
  basic_url: '/basic/', // basic注册的服务名
  zuul_url: '/zuul/', // zuul注册的服务名
  upm_url: '/upm/', // upm权限服务
  project_url: '/open/', // 单个项目注册的微服务名称
  tenancy_url: '/tenancy/',
  common_url: '/common/',
  msg_url: '/msg/',
  // 登录页支持多个系统切换，projects是每个系统信息的汇总
  projects: {
    open: {
      name: '平台管理系统',
      url: 'http://localhost:9875/'
    }
  },
  typeUrl: {
    open: 'http://localhost:8888/#/'
  }
}
