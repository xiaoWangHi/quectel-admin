<template>
  <div class="countToItem">
    <count-to :start-val="0" :end-val="value" :duration="option.duration || 1500" class="card-panel-num" :style="{color: color}" />
    <span v-if="title" class="title font14 contentColor">{{title}}</span>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  props: {
    value: {
      type: Number,
      default: () => {
        return 0
      }
    },
    color: {
      type: String,
      default: () => {
        return ''
      }
    },
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    countTo
  }
}
</script>

<style lang='scss' scoped>
.countToItem{
  @include fc;
  width: 100%;
  .card-panel-num{
    color: red;
    font-weight: 550;
    font-size: $--text-24;
  }
}
</style>
