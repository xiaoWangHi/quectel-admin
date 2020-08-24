

### 框架安装



```bash

# 克隆项目
git clone https://github.com/xiaoWangHi/quectel-admin.git

# 进入项目目录
cd quectel-admin

# 安装依赖
npm install

# 本地开发 启动项目
npm run serve

# 打包项目
npm run build

```

### UI组件安装

npm 安装
```bash

# npm 安装
npm install quectel-ui  或  cnpm install quectel-ui  (建议npm)

# npm 更新版本
npm update quectel-ui@xxx

--------------

# 如安装过程中出现报错，建议先卸载原版本，然后重新安装。 即：

# 1、 卸载
npm uninstall quectel-ui
# 2、 安装
npm install quectel-ui

```

**Tips: npm 小工具**
```bash
# npm 清缓存
npm cache clean --force

# npm 设置淘宝源
npm config set registry https://registry.npm.taobao.org

# npm 还原镜像
npm config set registry http://registry.npmjs.org

# npm 查看包详情
npm info quectel-ui

# npm 查看所有版本号
npm view quectel-ui versions

```


----------


CDN 安装
> 目前可以通过 [unpkg.com/quectel-ui](https://unpkg.com/browse/quectel-ui/lib/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。
```html

<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/quectel-ui/lib/quectel-ui.css">

<!-- 引入组件库 -->
<script src="https://unpkg.com/browse/quectel-ui/lib/quectel-ui.umd.min.js"></script>

```
----------


**项目文档**

> 本文档项目 基于 [vuepress](https://www.vuepress.cn/) 开发。


```bash

# 运行项目文档
npm run docs:dev

# 打包项目文档
npm run docs:build

```
----------

