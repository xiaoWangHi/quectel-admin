const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
module.exports = {
  chainWebpack: config => {
    config.plugins.delete('preload')
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
      .set('utils', resolve('src/utils'))
      .set('api', resolve('src/api'))
      .set('mixins', resolve('src/mixins'))
      .set('directive', resolve('src/directive'))
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
    // config.externals = {
    //   'vue': 'Vue',
    //   'vuex': 'Vuex',
    //   'element-ui': 'ELEMENT',
    //   'echarts': 'echarts'
    // };
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/common.scss";`
      }
    }
  },
  devServer: {
    // before: require('./src/api/mock/mock-server.js'),
    proxy: {
      '/api': {
        target: 'http://10.66.107.33:8892',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 通过pathRewrite重写地址，将前缀/api转为/
        }
      }
    },
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./src/api/mock/mock-server.js')
    // proxy: {
    //   // change xxx-api/login => mock/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: `http://localhost:${port}/mock`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // },
    // after: require('./src/api/mock/mock-server.js')
  },
  productionSourceMap: false,
  runtimeCompiler: true
}
