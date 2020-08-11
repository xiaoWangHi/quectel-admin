<template>
  <div class="padding10 stepsDiv">
    <steps  v-model='active'
            :list='stepsList'
            :title='formData.title'
            :direction="formData.direction"
            :alignCenter="formData.alignCenter"
            :buttonShow="formData.buttonShow"
            :headerShow='formData.headerShow'
            :cancelShow="formData.cancelShow"
            @cancel="cancel"
            @next="next"
            @prev='prev'
            @confirm="confirm">
      <div class="formContent">
        <el-form :model="formData" label-width="160px">
          <el-form-item label='标题'>
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label='方向'>
            <el-radio-group v-model="formData.direction">
              <el-radio label="vertical">纵向</el-radio>
              <el-radio label="horizontal">横向</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label='是否显示底部按钮'>
            <el-switch v-model="formData.buttonShow"></el-switch>
          </el-form-item>
          <el-form-item label='是否显示头部内容'>
            <el-switch v-model="formData.headerShow"></el-switch>
          </el-form-item>
          <el-form-item label="显示取消按钮">
            <el-switch v-model="formData.cancelShow"></el-switch>
          </el-form-item>
        </el-form>
      </div>
    </steps>
  </div>
</template>

<script>
import { Steps } from 'components'
export default {
  name: 'stepsView',
  components: { Steps },
  data() {
    return {
      active: 0,
      formData: {
        title: '步骤条标题',
        direction: 'horizontal',
        alignCenter: true,
        buttonShow: true,
        headerShow: true,
        cancelShow: true
      },
      stepsList: [
        { title: '步骤步骤步骤1', icon: 'el-icon-edit', description: '描述文字' },
        { title: '步骤2', icon: 'el-icon-edit', description: '描述文字' },
        { title: '步骤3', icon: 'el-icon-edit', description: '描述文字' }
      ]
    }
  },
  methods: {
    // 取消
    cancel() {
      this.$message.warning('点击了取消')
    },
    // 上一步
    prev() {
      this.$message.info('点击了上一步')
      this.active--
    },
    // 下一步
    next() {
      this.$message.info('点击了下一步')
      this.active++
    },
    // 点击完成
    confirm() {
      this.$message.success('点击了完成')
    }
  }
}
</script>

<style lang='scss' scoped>
.stepsDiv{
  height: 100%;
  .formContent{
    padding: 20px;
  }
}
</style>
