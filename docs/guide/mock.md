### Mock Data

Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发更加独立自主，不会被服务端的开发所阻塞。


### Mockjs

由于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 是一个纯前端个人项目，所有的数据都是用 [mockjs](https://github.com/nuysoft/Mock) 模拟生成。它的原理是: 拦截了所有的请求并代理到本地，然后进行数据模拟，所以你会发现 `network` 中没有发出任何的请求。

但它的最大的问题是就是它的实现机制。它会重写浏览器的`XMLHttpRequest`对象，从而才能拦截所有请求，代理到本地。大部分情况下用起来还是蛮方便的，但就因为它重写了`XMLHttpRequest`对象，所以比如`progress`方法，或者一些底层依赖`XMLHttpRequest`的库都会和它发生不兼容，可以看一下我项目的[issues](https://github.com/PanJiaChen/vue-element-admin/issues?utf8=%E2%9C%93&q=mock)，就知道多少人被坑了。

它还有一个问题是，因为是它本地模拟的数据，实际上不会走任何网络请求。所以本地调试起来很蛋疼，只能通过`console.log`来调试。就拿`vue-element-admin`来说，想搞清楚 `getInfo()`接口返回了什么数据，只能通过看源码或者手动 `Debug` 才能知道。


### 移除

如果你不想使用`mock-server`的话只要在[vue.config.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/vue.config.js)中移除`webpack-dev-server`中`proxy`和`after`这个`Middleware`就可以了。

现在默认情况下本地的请求会代理到`http://localhost:${port}/mock`下，如果你想调整为自己的 mock 地址可以修改 `proxy`

```js
proxy: {
  // change xxx-api/login => mock/login
  // detail: https://cli.vuejs.org/config/#devserver-proxy
  [process.env.VUE_APP_BASE_API]: {
    target: `http://localhost:${port}/mock`,
    changeOrigin: true,
    pathRewrite: {
      ['^' + process.env.VUE_APP_BASE_API]: ''
    }
  }
},
after: require('./mock/mock-server.js')
```

:::tip
**请注意：该操作需要重启服务**
:::

`mock-server`只会在开发环境中使用，线上生产环境目前使用`MockJs`进行模拟。如果不需要请移除。具体代码：[main.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/main.js)

```js
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
```

### 新增

如果你想添加 mock 数据，只要在根目录下找到`mock`文件，添加对应的路由，对其进行拦截和模拟数据即可。

比如我现在在[src/api/article](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/api/article.js)中需要添加一个查询某篇文章下面评论数的接口`fetchComments`，首先新建接口：

```js
export function fetchComments(id) {
  return request({
    url: `/article/${id}/comments`,
    method: 'get'
  })
}
```

声明完接口之后，我们需要找到对应的 mock 文件夹[mock/article.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/mock/article.js)，在下面创建一个能拦截路由的 mock 接口

**请注意，mock 拦截是基于路由来做的，请确保 mock 数据一定能匹配你的 api 路由，支持正则**

```js
// fetchComments 的 mock
{
  // url 必须能匹配你的接口路由
  // 比如 fetchComments 对应的路由可能是 /article/1/comments 或者 /article/2/comments
  // 所以你需要通过正则来进行匹配
  url: '/article/[A-Za-z0-9]/comments',
  type: 'get', // 必须和你接口定义的类型一样
  response: (req, res) => {
    // 返回的结果
    // req and res detail see
    // https://expressjs.com/zh-cn/api.html#req
    return {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
}
```

### 修改

最常见的操作就是：你本地模拟了了一些数据，待后端完成接口后，逐步替换掉原先 mock 的接口。

我们以[src/api/role.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/api/role.js)中的`getRoles`接口为例。它原本是在[mock/role/index.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/mock/role/index.js)中 mock 的数据。现在我们需要将它切换为真实后端数据，只要在[mock/role/index.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/mock/role/index.js)找到对应的路由，之后将它删除即可。这时候你可以在`network`中，查看到真实的数据。

```js
// api 中声明的路由
export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

//找到对应的路由，并删除
{
    url: '/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },
```

### 多个 server

目前项目只启动了一个`mock-server`，当然你也可以有自己其它的`mock-server`或者代理接口。可以一部分接口走这个服务，另一些接口走另一个服务。只需要将它们分别设置不同的的`baseURL`即可。 [@/utils/request.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/request.js)

之后根据设置的 url 规则在 [vue.config.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/vue.config.js) 中配置多个 `proxy` 。

[相关文档](https://webpack.docschina.org/configuration/dev-server/#devserver-proxy)

### 启用纯前端 Mock

现在在[mock/index.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/mock/index.js#L19)也封装了一个纯前端 mock 的方法，你只需要在[src/main.js](https://github.com/PanJiaChen/vue-element-admin/tree/master/src)中：

```js
import { mockXHR } from '../mock'
mockXHR()
```

这样就会变成纯前端 mock 数据了和`v4.0`版本之前的 mock 方案是一样的，原理见上文。目前你看到的线上[demo](https://panjiachen.github.io/vue-element-admin)就是采用该种方式。

### 本地 Mock 数据与线上数据切换

有很多时候我们会遇到本地使用 mock 数据，线上环境使用真实数据，或者说不同环境使用不同的数据。

- **Easy-Mock 的形式**

你需要保证你本地模拟 api 除了根路径其它的地址是一致的。
比如：

```
https://api-dev/login   // 本地请求

https://api-prod/login  // 线上请求
```

我们可以通过之后会介绍的[环境变量](/zh/guide/essentials/deploy.html#环境变量)来做到不同环境下，请求不同的 api 地址。

```bash
# .env.development
VUE_APP_BASE_API = '/dev-api' #注入本地 api 的根路径
```

```bash
# .env.production
VUE_APP_BASE_API = '/prod-api' #注入线上 api 的根路径
```

之后根据环境变量创建`axios`实例，让它具有不同的`baseURL`。 [@/utils/request.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/request.js)

```js
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})
```

这样我们就做到了自动根据环境变量切换本地和线上 api。

- **Mock.js 的切换**

当我们本地使用 `Mock.js` 模拟本地数据，线上使用真实环境 api 方法。这与上面的 easy-mock 的方法是差不多的。我们主要是判断：是线上环境的时候，不引入 mock 数据就可以了，只有在本地引入 `Mock.js`。

```js
// main.js
// 通过环境变量来判断是否需要加载启用
if (process.env.NODE_ENV === 'development') {
  require('./mock') // simulation data
}
```

只有在本地环境之中才会引入 mock 数据。
