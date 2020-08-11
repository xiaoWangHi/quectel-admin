<template>
<div>
  <div class="exampleDiv">
    <div class="title h3">消息弹框</div>
    <el-button type="success" v-waves @click="successConfirm">成功弹框</el-button>
    <el-button type="info" v-waves @click="infoConfirm">提示弹框</el-button>
    <el-button type="warning" v-waves @click="warningConfirm">警告弹框</el-button>
    <el-button type="danger" v-waves @click="errorConfirm">错误弹框</el-button>
  </div>

  <div class="exampleDiv">
    <div class="title h3">消息提示</div>
    <el-button type="success" v-waves @click="successMessage">成功提示</el-button>
    <el-button type="info" v-waves @click="infoMessage">提示提示</el-button>
    <el-button type="warning" v-waves @click="warningMessage">警告提示</el-button>
    <el-button type="danger" v-waves @click="errorMessage">错误提示</el-button>
  </div>

  <div class="exampleDiv">
    <div class="title h3">对话框</div>
    <el-button type="success" v-waves @click="dialogOption.visible = true">打开对话框</el-button>
    <div class="exampleDiv">
      {{formOption.formModel}}
    </div>
  </div>

  <!-- 表单弹框 -->
  <form-dialog :option="dialogOption" :formList='formOption.fromList' :formModel='formOption.formModel' :rules='formOption.formRules' @close='dialogClose'></form-dialog>
</div>
</template>

<script>
import { FormDialog } from 'components'
export default {
  name: 'dialogView',
  components: { FormDialog },
  data() {
    return {
      dialogOption: { // 弹框基本设置
        title: '弹框',
        visible: false,
        labelWidth: '100px'
      },
      formOption: {
        formRules: {
          name: [{ required: true, message: this.$t('message.pleaseEnter'), trigger: 'blur' }]
        },
        fromList: [ // 表单列表
          {
            formType: 'input',
            bind: 'key',
            label: 'input',
            prop: 'name'
          }, {
            formType: 'radio',
            bind: 'radio',
            label: 'radio',
            options: [
              { label: '1', value: 1 },
              { label: '2', value: 2 }
            ]
          }, {
            formType: 'checkbox',
            bind: 'checkbox',
            label: 'checkbox',
            options: [
              { label: '1', value: 1 },
              { label: '2', value: 2 }
            ]
          }, {
            formType: 'cascader',
            bind: 'cascader',
            label: 'cascader',
            options: [
              { label: '1', value: 1, children: [
                { label: '1', value: 1 }, { label: '1', value: 1 }
              ] },
              { label: '1', value: 1 },
              { label: '1', value: 1 }
            ]
          }, {
            formType: 'select',
            bind: 'select',
            label: 'select',
            options: [
              { label: '1', value: 1 },
              { label: '2', value: 2 }
            ]
          }, {
            formType: 'date',
            bind: 'date',
            label: 'date'
          }, {
            formType: 'switch',
            bind: 'switch',
            label: 'switch'
          }, {
            formType: 'inputNumber',
            bind: 'inputNumber',
            label: 'inputNumber'
          }
        ],
        formModel: {
          key: '',
          radio: '1',
          checkbox: [],
          cascader: [],
          select: '',
          date: [],
          switch: '',
          inputNumber: ''
        }
      }
    }
  },
  methods: {
    /**
     * 弹框方法
     **/
    successConfirm() {
      this.$confirm({
        message: 'success',
        title: 'success'
      }, 'success').then(res => {
        this.$message.success(this.$t('message.confirm'))
      }).catch(() => {
        this.$message.error(this.$t('message.cancel'))
      })
    },
    infoConfirm() {
      this.$confirm({
        message: 'info',
        title: 'info'
      }, 'info').then(res => {
        this.$message.success(this.$t('message.confirm'))
      }).catch(() => {
        this.$message.error(this.$t('message.cancel'))
      })
    },
    warningConfirm() {
      this.$confirm({
        message: 'warning',
        title: 'warning'
      }, 'warning').then(res => {
        this.$message.success(this.$t('message.confirm'))
      }).catch(() => {
        this.$message.error(this.$t('message.cancel'))
      })
    },
    errorConfirm() {
      this.$confirm({
        message: 'error',
        title: 'error'
      }, 'error').then(res => {
        this.$message.success(this.$t('message.confirm'))
      }).catch(() => {
        this.$message.error(this.$t('message.cancel'))
      })
    },
    /**
     * 提示方法
    */
    successMessage() {
      this.$message.success('success')
    },
    infoMessage() {
      this.$message.info('info')
    },
    warningMessage() {
      this.$message.warning('warning')
    },
    errorMessage() {
      this.$message.error('error')
    },
    /**
     * 对话框方法
    */
    dialogClose() {
      this.dialogOption.visible = false
    }
  }
}
</script>

<style>

</style>
