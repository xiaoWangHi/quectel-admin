<template>
  <div class="steps-container fc">
    <slot name="header" v-if="headerShow">
      <div class="title">{{title}}</div>
    </slot>
    <div class="steps-container-div" :class="direction === 'horizontal' ? 'fc' : 'fj'">
      <div class="setps-header" :class="direction === 'horizontal' ? 'setps-header-w' : 'setps-header-h'">
        <el-steps :direction="direction"
                  :active="value"
                  finish-status="success"
                  :simple="direction === 'horizontal'"
                  process-status='success'>
          <el-step v-for="(item, index) in list"
                  :key="index" :title="item.title"
                  :icon='item.icon'
                  :description='item.description'></el-step>
        </el-steps>
      </div>
      <div class="steps-content">
        <slot></slot>
      </div>
      <div class="steps-footer" v-if="buttonShow" :class="direction === 'horizontal' ? 'steps-footer-w' : 'steps-footer-h'">
        <slot name="footer"></slot>
        <div class="footer-button" :class="'text-' + footerAlign">
          <el-button v-if="cancelShow" @click="cancel">{{$t('message.cancel')}}</el-button>
          <el-button type="primary" v-if="value !== 0" @click="prev">{{$t('message.PrevStep')}}</el-button>
          <el-button type="primary" v-if="value !== (list.length - 1)" @click="next">{{$t('message.NextStep')}}</el-button>
          <el-button type="primary" v-else @click="confirm">{{$t('message.confirm')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{}
  },
  props: {
    value: {
      type: Number,
      default: () => {
        return 0
      }
    },
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    direction: {
      type: String,
      default: () => {
        return 'vertical' // 排列方向  	vertical、horizontal
      }
    },
    footerAlign: { // 底部按钮排列：left center right
      type: String,
      default: () => {
        return 'center'
      }
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    headerShow: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    cancelShow: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    buttonShow: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  methods: {
    // 点击取消
    cancel() {
      this.$emit('cancel')
    },
    // 点击上一步
    prev() {
      this.$emit('prev')
    },
    // 点击下一步
    next() {
      this.$emit('next')
    },
    // 点击完成
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang='scss' scoped>
.steps-container{
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  .title{
    font-size: $--text-16;
    line-height: 36px;
    height: 36px;
    font-weight: 550;
    width: 100%;
    text-align: left;
  }
  .steps-container-div{
    height: 100%;
    width: 100%;
    flex: 1;
  }
  .setps-header-w{
    width: 100%;
    height: 46px;
    border-bottom: 1px dashed $--color-gray-b;
  }
  .setps-header-h{
    width: 100px;
    height: 100%;
    padding-right: 10px;
    border-right: 1px dashed $--color-gray-e;
  }
  .steps-content{
    flex: 1;
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }
  .steps-footer-w{
    @include fj(center);
    align-items: center;
    height: 50px;
    width: 100%;
    background: $--color-white;
    border-top: 1px dashed $--color-gray-e;
    .footer-button{
      @include fj(center);
      align-items: center;
    }
  }
  .steps-footer-h{
    @include fc(center);
    align-items: center;
    height: 100%;
    width: 80px;
    border-left: 1px dashed $--color-gray-e;
    background: $--color-white;
    .footer-button{
      @include fc(center);
      align-items: center;
      .el-button{
        margin: 10px 0;
      }
    }
  }
}
</style>
