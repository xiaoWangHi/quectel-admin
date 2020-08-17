<template>
  <div class="padding10 echarts-container">
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="charts">
          <q-charts :option="pieOption" id="pie"></q-charts>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="charts">
          <q-charts :option="barOption" id='bar'></q-charts>
        </div>
      </el-col>
    </el-row>
    <br/><br/>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="charts">
          <q-charts :option="lineOption" id='line'></q-charts>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="charts">
          <q-charts :option='mapOption' id="map"></q-charts>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'chart',
  data() {
    const xAxisData = []; const data1 = []; const data2 = []
    for (var i = 0; i < 10; i++) {
      xAxisData.push('类目' + i)
      data1.push((Math.sin(i) * (i / 5 - 10) + i / 6) * 5)
      data2.push((Math.cos(i / 4) * (i / 5 - 10) + i / 6) * 5)
    }
    return {
      // 饼图参数
      pieOption: {
        title: '饼图',
        xAxis: [],
        yAxis: [],
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 274, name: '联盟广告' },
            { value: 235, name: '视频广告' },
            { value: 400, name: '搜索引擎' }
          ].sort(function(a, b) { return a.value - b.value }),
          roseType: 'radius',
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200
          }
        }]
      },
      // 柱状图参数
      barOption: {
        title: '柱状图',
        legend: {
          data: ['bar', 'bar2', 'bar3']
        },
        xAxis: { data: xAxisData },
        yAxis: {},
        series: [{
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: function(idx) {
            return idx * 10
          }
        }, {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: function(idx) {
            return idx * 10 + 10
          }
        }, {
          name: 'bar3',
          type: 'bar',
          data: data2,
          animationDelay: function(idx) {
            return idx * 10 + 6
          }
        }]
      },
      // 折线图参数
      lineOption: {
        title: '折线图',
        legend: {
          data: ['bar', 'bar2']
        },
        xAxis: { data: xAxisData },
        yAxis: {},
        series: [{
          name: 'bar',
          type: 'line',
          data: data1,
          animationDelay: function(idx) {
            return idx * 10
          }
        }, {
          name: 'bar2',
          type: 'line',
          data: data2,
          animationDelay: function(idx) {
            return idx * 10 + 10
          }
        }]
      },
      // 地图参数
      mapOption: {
        title: '地图',
        visualMap: {
          min: 0,
          max: 100000,
          realtime: false,
          calculable: true
        },
        series: [{
          type: 'map',
          mapType: 'world',
          roam: true,
          itemStyle: {
            emphasis: { label: { show: true }}
          },
          data: [
            { name: 'Australia', value: 22404.488 },
            { name: 'Austria', value: 8401.924 },
            { name: 'Azerbaijan', value: 9094.718 },
            { name: 'Burundi', value: 9232.753 },
            { name: 'Belgium', value: 10941.288 },
            { name: 'Democratic Republic of the Congo', value: 62191.161 },
            { name: 'Republic of the Congo', value: 3573.024 },
            { name: 'Colombia', value: 46444.798 },
            { name: 'Costa Rica', value: 4669.685 },
            { name: 'Cuba', value: 11281.768 },
            { name: 'Northern Cyprus', value: 1.468 },
            { name: 'Cyprus', value: 1103.685 },
            { name: 'Czech Republic', value: 10553.701 },
            { name: 'Germany', value: 83017.404 },
            { name: 'Djibouti', value: 834.036 },
            { name: 'Denmark', value: 5550.959 },
            { name: 'Dominican Republic', value: 10016.797 },
            { name: 'Algeria', value: 37062.82 },
            { name: 'Ecuador', value: 15001.072 },
            { name: 'Egypt', value: 78075.705 },
            { name: 'Eritrea', value: 5741.159 },
            { name: 'Spain', value: 46182.038 },
            { name: 'Estonia', value: 1298.533 }

          ]
        }]
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.echarts-container{
  height: 100%;
  background: $--color-bg;
  .charts{
    padding: 10px;
    background: $--color-white;
  }
}
</style>
