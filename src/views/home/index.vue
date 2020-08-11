<template>
  <div class="home-container">
    <div class="row">
      <div class="col">
        <div class="col-content">
          <to-do-list title='待审核'></to-do-list>
        </div>
      </div>
      <div class="col">
        <div class="col-content fc-start">
          <div class="header fj">
            <div class="h3 titleColor">在线人数</div>
            <div class="fj font12 contentColor pointer">更多&nbsp;&nbsp;<i class="el-icon-arrow-right"></i> </div>
          </div><br/><br/>
          <bar-chart />
        </div>
      </div>
      <div class="col">
        <div class="col-content fc-start">
          <div class="header fj">
            <div class="h3 titleColor">在线人数</div>
            <div class="fj font12 contentColor pointer">更多&nbsp;&nbsp;<i class="el-icon-arrow-right"></i> </div>
          </div><br/><br/>
          <div class="chartDiv">
            <chart :option="pieOption" id="pie"></chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="col-content">
          <div class="header fj">
            <div class="h3 titleColor">数据展示</div>
            <div class="fj font12 contentColor pointer">更多&nbsp;&nbsp;<i class="el-icon-arrow-right"></i> </div>
          </div><br/><br/>
          <el-row>
            <el-col :span="12">
              <div class="countDiv">
                <count-to :value="999" title="新增员工" :color='color()'></count-to>
              </div>
            </el-col>
            <el-col :span="12">
              <count-to :value="14567" title="迟到员工"  :color='color()'></count-to>
            </el-col>
          </el-row>
          <br/>
          <el-row>
            <el-col :span="12">
              <count-to :value="9757" title="迟到员工" :color='color()'></count-to>
            </el-col>
            <el-col :span="12">
              <count-to :value="5686" title="迟到员工" :color='color()'></count-to>
            </el-col>
          </el-row>
          <br/>
          <el-row>
            <el-col :span="12">
              <count-to :value="23333" title="迟到员工" :color='color()'></count-to>
            </el-col>
            <el-col :span="12">
              <count-to :value="0" title="迟到员工" :color='color()'></count-to>
            </el-col>
          </el-row>
          <br/>
          <el-row>
            <el-col :span="12">
              <count-to v-model="count" title="迟到员工" :color='color()'></count-to>
            </el-col>
            <el-col :span="12">
              <count-to v-model="count" title="迟到员工" :color='color()'></count-to>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="col">
        <div class="col-content">
           <to-do-list title='公司动态' btnType='link'></to-do-list>
        </div>
      </div>
      <div class="col">
        <div class="col-content">
           <to-do-list title='待审核'></to-do-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ToDoList, BarChart, Chart, CountTo } from 'components'

export default {
  name: 'home',
  components: {
    ToDoList, BarChart, Chart, CountTo
  },
  data() {
    return {
      count: 13600,
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
            { value: 335, name: '类型1' },
            { value: 310, name: '类型2' },
            { value: 274, name: '类型3' },
            { value: 235, name: '类型4' },
            { value: 400, name: '类型5' }
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
      }
    }
  },
  methods: {
    color() {
      const colors = [
        '#2ab1e8',
        '#35d1ce',
        '#f64f61',
        '#f1a55a',
        '#9b8bba',
        '#e098c7',
        '#8fd3e8',
        '#71669e',
        '#cc70af',
        '#7cb4cc']
      return colors[Math.floor(Math.random() * colors.length)]
    }
  }
}
</script>

<style lang='scss' scoped>
.home-container{
  @include fc(flex-start);
  height: 100%;
  width: 100%;
  overflow-x: auto;
  background: $--color-bg;
  .row{
    @include fj(center);
    width: 100%;
    flex: 1;
    .col{
      flex: 1;
      height: 100%;
      padding: 10px;
      .col-content{
        height: 100%;
        min-width: 300px;
        min-height: 200px;
        max-height: 400px;
        overflow: hidden;
        border-radius: 10px;
        padding: 0 10px;
        background: $--color-white;
        .chartDiv{
          width: 100%;
        }
        .header{
          width: 100%;
          @include fj;
          height: 40px;
          // padding: 10px 20px;
          text-align: left;
          border-bottom:1px solid #e6e6e6;
        }
        /deep/.el-row{
          margin-top: 14px;
        }
      }
    }
  }
}
</style>
