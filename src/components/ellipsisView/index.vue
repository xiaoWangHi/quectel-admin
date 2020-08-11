<template>
  <div class="ellipsisView" ref="ellipsisDiv"  :style="{width: parentWidth + 'px'}">
    <el-tooltip v-if="type === 'text'" :disabled='tooltopDis' class="item" effect="dark" :content="value" placement="top">
      <div class="ellipsis"  ref="ellipsis"  @mouseenter="hanldeTooltip">
        <span>{{value | noString}}</span>
      </div>
    </el-tooltip>
    <div v-else>type === link</div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: String,
      default: () => {
        return '' // 标识
      }
    },
    value: {
      type: [String, Array]
    },
    disabled: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    type: {
      type: String,
      default: () => {
        return 'text' // 文本:text  链接: link  标签：tag  标签列表：tagList
      }
    }
  },
  data() {
    return {
      tooltopDis: true,
      parentWidth: '' // 父集宽度
    }
  },
  mounted() {
    this.parentWidth = this.$refs.ellipsisDiv.clientWidth - 30
    // console.log('this.$refs', this.value, this.$refs.ellipsis.clientWidth, this.$refs)
  },
  methods: {
    hanldeTooltip(e) {
      if (e.target.clientWidth > this.parentWidth) {
        this.tooltopDis = false
      } else {
        this.tooltopDis = true
      }
    },
    changeWidth() {
      // this.parentWidth = this.$refs.ellipsisDiv.clientWidth
      this.$nextTick(() => {
        // this.$set(this, 'parentWidth', this.$refs.ellipsisDiv.clientWidth)
      })
    }
  },
  watch: {

  }
}
</script>

<style lang='scss' scoped>
.ellipsisView{
  .ellipsis{
    display: inline-block;
    // width: 100%;
    overflow: hidden;
    span{
      overflow: hidden;
       text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
}

</style>
