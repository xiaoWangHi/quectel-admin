module.exports = {
  title: 'Quectel-Admin',
  description: 'Just playing around',
  plugins: ['@vuepress/active-header-links'],
  themeConfig: {
    nav: [
      { text: '使用手册', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/' }
    ],
    sidebar: [
      {
        title: '介绍',   // 必要的
        path: '/guide/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      },
      {
        title: '安装',
        path: '/guide/install'
      },
      {
        title: '基础',
        collapsable: false, // 可选的, 默认值是 true,
        children: [
          {
            title: '目录结构',
            path: '/guide/Directory'
          },
          {
            title: '页面布局',
            path: '/guide/install'
          },
          {
            title: '路由',
            path: '/guide/install'
          },
          {
            title: 'Mock',
            path: '/guide/install'
          },
          {
            title: '与后端接口调试',
            path: '/guide/install'
          },
          {
            title: '国际化',
            path: '/guide/install'
          }
        ]
      },
      {
        title: '组件',
        collapsable: false, // 可选的, 默认值是 true,
        children: [
          {
            title: '面包屑',
            path: '/guide/install'
          },
          {
            title: '快速导航',
            path: '/guide/install'
          },
          {
            title: '表格',
            path: '/guide/install'
          },
          {
            title: '上传',
            path: '/guide/install'
          },
          {
            title: '图表',
            path: '/guide/install'
          },
          {
            title: '表单',
            path: '/guide/install'
          },
          {
            title: '按钮',
            path: '/guide/install'
          },
          {
            title: '图标',
            path: '/guide/install'
          },
          {
            title: '标签页',
            path: '/guide/install'
          },
          {
            title: '对话框',
            path: '/guide/install'
          },
          {
            title: '抽屉',
            path: '/guide/install'
          },
          {
            title: '进度条',
            path: '/guide/install'
          },
          {
            title: '图片剪裁',
            path: '/guide/install'
          },
          {
            title: '日历',
            path: '/guide/install'
          },
          {
            title: '时间轴',
            path: '/guide/install'
          },
          {
            title: '步骤条',
            path: '/guide/install'
          },
          {
            title: '树形控件',
            path: '/guide/install'
          }
        ]
      }
    ]
  }
}