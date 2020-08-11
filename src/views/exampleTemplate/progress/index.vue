<template>
  <div>
    <div class="exampleDiv">
      <div class="title">进度条</div>
      <div>
        <el-progress :percentage="50"></el-progress><br/>
        <el-progress :percentage="100" status="success"></el-progress><br/>
        <el-progress :percentage="100" status="warning"></el-progress><br/>
        <el-progress :percentage="50" status="exception"></el-progress>
      </div>
    </div>
    <div class="exampleDiv">
      <div class="title">进度条</div>
      <div>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress><br/>
        <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress><br/>
        <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress><br/>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
      </div>
    </div>
    <!-- <div class="exampleDiv">
      <div class="title">环形进度条</div>
      <div>
        <el-progress type="circle" :percentage="0"></el-progress>&nbsp;
        <el-progress type="circle" :percentage="25"></el-progress>&nbsp;
        <el-progress type="circle" :percentage="100" status="success"></el-progress>&nbsp;
        <el-progress type="circle" :percentage="70" status="warning"></el-progress>&nbsp;
        <el-progress type="circle" :percentage="50" status="exception"></el-progress>
      </div>
    </div>
    <div class="exampleDiv">
      <div class="title">仪表盘型进度条</div>
      <div>
        <el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'progressView',
  data() {
    return {
      percentage: 20,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    }
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    }
  }
}
</script>

<style>

</style>
