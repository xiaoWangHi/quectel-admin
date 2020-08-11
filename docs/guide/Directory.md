# 目录结构
---

```
├── docs                       # 项目文档目录
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   └── api                    # 所有请求
│        ├── mock              # mock 接口地址
│        ├── config.js         # 后台接口地址存放
│        ├── index.js          # 接口请求方式封装
│        ├── request.js        # 接口请求封装
│        └── socket.js         # socket 封装
│   └── assets                 # 静态资源
│        ├── iconfont          # 阿里 iconfont 存放
│        ├── images            # 静态图片
│        └── styles            # 公共样式
│   └── components             # 全局公用组件
│        ├── BarChart          # 柱状图封装
│        ├── Breadcrumb        # 面包屑封装
│        ├── Calendar          # 日历封装
│        ├── charts            # echarts 封装
│        ├── countTo           # 数字滚动封装
│        ├── cropper           # 图片编辑封装
│        ├── formDialog        # 表单弹窗封装
│        ├── formTemplate      # 表单弹窗封装
│        ├── indexTabs         # 标签页封装
│        ├── inputTree         # 输入框选择树形控件封装
│        ├── noData            # 暂无数据封装
│        ├── selectTree        # 树形结构选择封装
│        ├── Steps             # 步骤条封装
│        ├── Tips              # 鼠标移入提示封装
│        ├── treeList          # 树形列表封装
│        ├── upload            # 上传文件封装
│        └── index.js          # 公用组件注册文件
│   └── directive              # 全局自定义指令
│        ├── picture           # 查看图片指令
│        └── waves             # 水波纹指令
│   └── i18n                   # 中英文
│        ├── dateLang          # 时间类中英文文件
│        ├── langs             # 页面类中英文文件
│        └── menuLang          # 侧边栏中英文文件
│   ├── mixins                 # Vue mixins 方法
|   ├── mock                   # 项目mock 模拟数据
|   ├── plugins                # elementUI 引入
│   └── router                 # 路由
│        ├── exampleRouter.js  # 示例路由 （实际项目中需删除）
│        └── permission.js     # 路由守卫
│   ├── store                  # 全局 store管理
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   └── main.js                # 入口文件 加载组件 初始化等
├── theme                      # elementUI 主题
├── element-variables.scss     # elementUI 样式修改
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```