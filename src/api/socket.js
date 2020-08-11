import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default {
  install(Vue) {
    const keyPrefix = '_'

    // 设置监视回调的KEY前缀（防数字化）
    Vue.prototype.keyPrefix = keyPrefix

    /**
     * 定义送信应答监视函数
     * invokeId: 唯一识别码
     */
    const sendWM = function(destination, body = '', invokeId, func, timeout = 3000, headers = {}) {
      // make sure that the second argument is a function
      if (typeof func !== 'function') {
        throw {
          name: 'Vue Stomp Error',
          message: 'The fourth argument must be a function.'
        }
      }
      if (invokeId == null) {
        throw {
          name: 'Vue Stomp Error',
          message: 'The third argument must not be null.'
        }
      }

      if(this.$stompClient == null || !this.$stompClient.connected) {
        throw {
          name: 'Vue Stomp Error',
          message: 'The connection is not established.'
        }
      }
      // 追加要监视的指令
      if (this.monitorEvents) {
        const key = this.keyPrefix + invokeId
        const monitorParm = {
          'cmd': body,
          'sendTime': Date.now(),
          'timeout': timeout,
          'func': func
        }
        this.monitorEvents[key] = monitorParm
      }
      // 原始的送信调用
      console.log('body', body)
      this.$stompClient.send(destination, body, headers)
    }

    // 送信应答监视函数设备为Stomp原型函数
    Vue.prototype.sendWM = sendWM

    // 清除监视函数
    const removeStompMonitor = function(invokeId) {
      // make sure that the second argument is a function
      if (invokeId == null) {
        throw {
          name: 'Vue Stomp Error',
          message: 'The first argument must not be null.'
        }
      }
      const key = this.keyPrefix + invokeId
      if(this.monitorEvents[key] != null) {
        delete this.monitorEvents[key]
      }
    }
    // 清除监视函数为Stomp原型函数
    Vue.prototype.removeStompMonitor = removeStompMonitor

    const reconnErrorCallback = function(errorEvent) {
      if(errorEvent.type === 'close' && this.stompReconnect === true) {
        console.log('reconnErrorCallback reconnect required!')
        this.reconnecting = true
        // 发起连接
        this.connetWM(this.connectParams.serverEndPoint, this.connectParams.headers,
          this.connectParams.connectCallback, this.connectParams.errorCallback)
      }
      if(this.errorCallback) this.errorCallback(errorEvent)
    }
    Vue.prototype.reconnErrorCallback = reconnErrorCallback

    const connetWM = function(serverEndPoint, ...args) {
      // 已连接时直接返回，避免多重连接
      if(this.$stompClient && this.$stompClient.connected) {
        return
      }
      console.log('serverEndPoint', serverEndPoint)
      const socket = new SockJS('http://10.66.107.33:8892/quectel.stomp.io?Authorization=02ddf952-d30a-4607-af0b-25139fb5be7a')
      console.log(socket)
      const stompClient = Stomp.over(socket)
      Vue.prototype.$stompClient = stompClient

      if (this.stompReconnect === true && this.reconnecting !== true) {
        switch(args.length) {
          case 3:
            if (args[1] instanceof Function) {
              const errorCallback = args[2]
              args[2] = this.reconnErrorCallback.bind(this)
              this.errorCallback = errorCallback
            }
            break
          default:
            const errorCallback = args[3]
            args[3] = this.reconnErrorCallback
            this.errorCallback = errorCallback
        }
        // 保存连接参数
        const [headers, connectCallback, errorCallback] = this.$stompClient._parseConnect(...args)
        const connectParams = {
          'serverEndPoint': serverEndPoint,
          'headers': headers,
          'connectCallback': connectCallback,
          'errorCallback': errorCallback
        }
        this.connectParams = connectParams
      }
      this.reconnecting = false

      this.$stompClient.connect(...args)
      // 初始监控队列
      this.monitorEvents = []
      // 启动监视
      if(this.responseMonitor == null) {
        this.responseMonitor = setInterval(() => {
          const now = Date.now()
          for (const mEventIndex in this.monitorEvents) {
            const monitorParm = this.monitorEvents[mEventIndex]
            if(monitorParm) {
              const delta = now - monitorParm.sendTime
              // 判断是否超时
              if (delta > monitorParm.timeout) {
                // 超时回调处理
                if(typeof this.timeoutCallback === 'function') {
                  this.timeoutCallback(monitorParm.cmd)
                }
                // 清除此事件
                delete this.monitorEvents[mEventIndex]
              }
            }
          }
        }, this.monitorIntervalTime)
      }
    }
    // 带监视的连接函数为Stomp原型函数
    Vue.prototype.connetWM = connetWM
    // 初始参数设置
    const addListeners = function() {
      if (this.$options['stompClient']) {
        const conf = this.$options.stompClient
        if (conf.timeout) { // 设置超时回调函数
          if(typeof conf.timeout !== 'function') {
            throw {
              name: 'Vue Stomp Error',
              message: 'The argument[timeout] must be a function.'
            }
          }
          this.timeoutCallback = conf.timeout
        }
        // 监视轮询时间设置
        let monitorIntervalTime = 100
        if(conf.monitorIntervalTime && typeof conf.monitorIntervalTime === 'number' && !isNaN(conf.monitorIntervalTime)) {
          monitorIntervalTime = conf.monitorIntervalTime
        }
        this.monitorIntervalTime = monitorIntervalTime
        // 设置是否要重连
        if(conf.stompReconnect) {
          this.stompReconnect = conf.stompReconnect
        }
      }
    }
    Vue.prototype.addListeners = addListeners
    // 断开连接处理
    const disconnetWM = function() {
      // 断开连接
      if(this.$stompClient && this.$stompClient.connected) {
        this.$stompClient.disconnect()
      }

      // 清除所有监视对象
      clearInterval(this.responseMonitor)
      this.responseMonitor = null
    }
    Vue.prototype.disconnetWM = disconnetWM

    // 初始参数移除
    const removeListeners = function() {
      if (this.$options['stompClient']) {
        this.disconnetWM()

        delete this.monitorEvents

        delete this.timeoutCallback
      }
    }
    Vue.prototype.removeListeners = removeListeners

    Vue.mixin({
      beforeCreate: addListeners,
      beforeDestroy: removeListeners
    })
  }
}
