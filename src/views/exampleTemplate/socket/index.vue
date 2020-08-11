<template>
  <div class="padding10">
    <el-button @click="sendClick">发送</el-button>
  </div>
</template>

<script>
export default {
  created() {
    console.log('created')
    this.connectSrv()
  },
  methods: {
    sendClick() {
      this.send()
      this.onConnected()
    },
    onConnected(frame) {
      console.log('Connected: ' + frame)
      const that = this
      this.$stompClient.subscribe('/user/topic/common_notice', that.responseCallback, { id: 'mysubid' })
    },
    onFailed(frame) {
      console.log('Failed: ' + frame)
    },
    connectSrv() {
      var headers = {
        'login': 'guest',
        'passcode': 'guest',
        'Authorization': 'db2151ee-3fd7-4cf2-9c70-74829ea29c8b'
        // additional header
      }
      this.connetWM(headers, this.onConnected, this.onFailed)
    },
    getInvokeId() {
      var zero = '0000'
      var tmp = 4
      return zero.substr(0, tmp)
    },
    send() {
      const destination = '/app/test'
      const invokeId = this.getInvokeId()
      const body = {
        text: '123'
      }
      console.log('invokeId', invokeId, destination)
      this.sendWM(destination, body, invokeId, this.responseCallback, 3000)
    },
    responseCallback(message) {
      console.log('responseCallback msg=>', message)
      // const invokeId = frame.body.substr(invokeIdIndex, 4)
      // this.removeStompMonitor(invokeId)
    },
    disconnect() {
      this.disconnetWM()
    }
  },
  destroyed() {
    console.log('destroyed')
  },
  activated() {
    console.log('activated')
    // this.connectSrv()
  },
  deactivated() {
    this.disconnetWM()
    console.log('deactivated')
  }
}
</script>

<style>

</style>
