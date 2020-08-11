<template>
  <div>
    <div :id="id" :class="className" :style="{height:height,width:width}"></div>
    <select-theme v-if="theme" v-model="themeActive" @change="themeChange"></select-theme>
  </div>
</template>

<script>

import '../../../node_modules/echarts/map/js/china'
import '../../../node_modules/echarts/map/js/world'
import 'echarts/theme/shine.js'
import resize from './mixins/resize'
import echarts from 'echarts'
import Theme from './theme'
import SelectTheme from './selectTheme'

export default {
  mixins: [resize],
  components: { SelectTheme },
  props: {
    theme: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null,
      themeActive: ''
    }
  },
  mounted() {
    this.themeActive = Theme[0].name
    this.themeChange(Theme[0])
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    // 观察option的变化
    option: {
      handler(newValue, oldValue) {
        if (this.chart) {
          if(newValue) {
            this.themeChange(Theme[0])
          }
        }
      },
      deep: true, // 对象内部属性的监听，关键。
      immediate: true
    }
  },
  methods: {
    /**
     * 主题改变
    */
    themeChange(item) {
      this.themeActive = item.name
      this.chart && this.chart.dispose()
      this.initChart(item.name, item.json)
    },
    initChart(name = '', json = {}) {
      const option = this.option
      echarts.registerTheme(name, json)
      this.chart = echarts.init(document.getElementById(this.id), name)
      this.chart.setOption({
        title: {
          text: this.option.title || 'title'
        },
        visualMap: option.visualMap,
        legend: option.legend,
        xAxis: option.xAxis,
        yAxis: option.yAxis,
        series: option.series
      }, true)
    }
  }
}
</script>
<style lang="scss" scoped>
.class {
	display: inline-block;
}
</style>
