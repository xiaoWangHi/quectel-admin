# 布局

本框架整体布局分为：顶部、侧边栏和内容部分，其中顶部包括面包屑和快速导航，可根据实际项目需求，决定是否展示。


![layout](/layout.png)

> 对应代码 [views/layout](https://github.com/xiaoWangHi/quectel-admin/tree/master/src/views/layout)

这里用的是[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)

```js
  <keep-alive>
    <router-view :key="key" />
  </keep-alive>
```
---

### 配置页面
 这里的 router-view 是最顶层的出口，渲染最高级路由匹配到的组件。
 要在嵌套的出口中渲染组件，需要在 [router.js](https://github.com/xiaoWangHi/quectel-admin/blob/master/src/router/index.js) 的参数中使用 children 配置：  
 * 一级 component 需设置 Layout 对应的vue文件  
 * 二级 children 中，component 为页面对应的vue文件  

 ```js
/* 框架 */
const Layout = r => require.ensure([], () => r(require('@/views/layout/index.vue')), 'Layout')

/* 表格页面 */
const Table = r => require.ensure([], () => r(require('@/views/exampleTemplate/table/index.vue')))

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
  }
]
 ```

配置完成后，页面显示如下：

![](/table.png)

---


### 配置自定义页面

 * 一级 component 需设置 自定义页面对应的vue文件  
 例如缺省页面配置：
```js
/* 403 */
const Error_403 = r => require.ensure([], () => r(require('@/views/error-page/403.vue')))

const exampleRouter = [
  {
    path: '/403',
    component: Error_403,
    hidden: true
  }
]
```

配置完成后，页面显示如下：

![](/403.png)

---
> 对应代码 [router](https://github.com/xiaoWangHi/quectel-admin/tree/master/src/router)