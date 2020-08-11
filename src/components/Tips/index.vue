<template>
  <div class="tips-container">
    <el-tooltip :effect="effect" :content="text" :placement="placement">
      <slot></slot>
      <i :class="icon" class="icon"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => {
        return 'el-icon-info'
      }
    },
    effect: {
      type: String,
      default: () => {
        return 'dark'
      }
    },
    placement: {
      type: String,
      default: () => {
        return 'right'
      }
    },
    text: {
      type: String,
      default: () => {
        return ''
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.tips-container{
  display: inline-block;
  .icon{
    font-size: 16px;
    margin: 0 4px;
    color: $--color-primary
  }
}
</style>
