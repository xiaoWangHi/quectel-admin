
### 路由和导航
---

项目中，路由和侧边栏是对应的，在路由中新增配置，侧边栏就会显示对应的页面入口。具体项目的权限配置，由[路由守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)逻辑完成。


### 配置项
```js
hidden: true                  // 是否出现在侧边
alwaysShow: true              // 这样它就会忽略之前定义的规则，一直显示根路由
redirect: noRedirect          // 面包屑中不可点击
name                          // 必填
meta : {
  title: 'title'
  icon:
  noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  affix: true                  // 若果设置为true，它则会固定在tags-view中(默认 false)
  breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
}
```
---

**示例**
```js
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
}
```
> 示例代码 [router/exampleRouter.js](https://github.com/xiaoWangHi/quectel-admin/blob/master/src/router/exampleRouter.js)




### 路由
---
这里的路由分为两种，constantRoutes 和 asyncRoutes。

**constantRoutes**： 代表那些不需要动态判断权限的路由，如登录页、缺省页等。

**asyncRoutes**： 代表那些需求动态判断权限并通过 **addRoutes** 动态添加的页面。


<font color=#fdbb07 size=5>  注意： </font>  
如果这里有一个需要非常注意的地方就是 <font color=#42b983> 404 </font>  页面一定要最后加载，如果放在 **constantRoutes** 一同声明了 <font color=#42b983> 404 </font> ，后面的所以页面都会被拦截到 <font color=#42b983> 404 </font>    

这里采用的方法是：在 **addRoutes** 之前 **push** 404配置  

> 对应代码 [router/permission.js](https://github.com/xiaoWangHi/quectel-admin/blob/master/src/router/permission.js)