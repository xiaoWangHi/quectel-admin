<template>
  <div class="padding10">
    <div class="exampleDiv">
      <div class="title h3">表单设置</div>
      <el-form ref="form" :model="setting" label-width="80px">
        <el-form-item label="表单尺寸">
          <el-radio-group v-model="setting.size">
            <el-radio label="medium">medium</el-radio>
            <el-radio label="small">small</el-radio>
            <el-radio label="mini">mini</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="表单禁用">
          <el-switch
            v-model="setting.disabled">
          </el-switch>
        </el-form-item>
        <el-form-item label="行内表单">
          <el-switch
            v-model="setting.inline">
          </el-switch>
        </el-form-item>
        <el-form-item label="对齐方式">
          <el-radio-group v-model="setting.labelPosition">
            <el-radio label="left">左对齐</el-radio>
            <el-radio label="right">右对齐</el-radio>
            <el-radio label="top">顶部对齐</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="form" :size="setting.size"  :label-position="setting.labelPosition" :inline='setting.inline' :disabled='setting.disabled' label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  name: 'formView',
  data() {
    return {
      setting: {
        size: 'small',
        disabled: false,
        inline: false,
        labelPosition: 'left'
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss" scoped>
.exampleDiv{
  background: $--color-bg;
  margin-bottom: 20px;
}
.line{
  text-align: center;
}
</style>
