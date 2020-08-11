<template>
  <div>
    <el-dialog
      :title="option.title"
      :visible.sync="option.visible || false"
      :width="option.width || '50%'"
      append-to-body
      :fullscreen="fullscreen"
      :close-on-click-modal="false"
      :show-close='false'
      :before-close="close">
      <div slot="title" class="fj">
        <div class="font16 h3">{{option.title}}</div>
        <div class="titleIcon">
          <el-tooltip class="item" effect="dark" :content="fullscreen ? $t('message.cancel') + $t('message.screen') : $t('message.screen')" placement="bottom">
            <i class="iconfont contentColor font24 pointer" :class="fullscreen ? 'iconsuoxiaotuichuquanpingshouhui' : 'iconquanping1'" @click="fullscreen = !fullscreen"></i>
          </el-tooltip>
          <i class="iconfont iconiconddgb contentColor font24 pointer" @click="close"></i>
        </div>
      </div>
      <!-- 表单内容 -->
      <el-form :model="formModel" v-if="formArr && formArr.length" :label-width="option.labelWidth || '80px'" :size="option.fromSize || 'mini'" :rules='rules' :disabled="option.formDisabled">
        <el-form-item v-for="(item, index) in formArr" :key="index" :label="item.label" :prop="item.prop">
          <!--
          输入框
          bind: 绑定值   --必填
          formType：input  --必填
          尺寸： size
          类型：type
          输入框头部图标 prefixIcon
          输入框尾部图标 suffixIcon
        -->
          <div v-if="item.formType === 'input'">
            <el-input v-model="formModel[item.bind]"
                      :type="item.type || 'text'"
                      :disabled="item.disabled"
                      :prefix-icon="item.prefixIcon"
                      :suffix-icon="item.suffixIcon"
                      :clearable="item.clearable"
                      :placeholder="item.placeholder || $t('message.pleaseEnter')">
            </el-input>
          </div>
          <!--
          输入框
          bind: 绑定值   --必填
          formType：date --必填
          显示类型： type  // 可选 year/month/date/week/ datetime/datetimerange/daterange
          范围选择时开始日期的占位内容 startPlaceholder
          范围选择时结束日期的占位内容 endPlaceholder
          是否使用箭头进行时间选择  timeArrowControl
          显示在输入框中的格式  format  // yyyy-MM-dd HH:mm:ss
          绑定值的格式。 valueFormat
          是否显示清除按钮  clearable
          禁用  disabled
          只读  readonly
        -->
          <div v-if="item.formType === 'date'">
            <el-date-picker
              v-model="formModel[item.bind]"
              :type="item.type || 'datetimerange'"
              :picker-options="item.pickerOptions || {}"
              :time-arrow-control="item.timeArrowControl || false"
              :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
              :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
              :clearable="item.clearable || true"
              :disabled="item.disabled || false"
              :readonly="item.readonly || false"
              range-separator="-"
              :start-placeholder="item.startPlaceholder || $t('message.StartDate')"
              :end-placeholder="item.endPlaceholder || $t('message.EndDate')">
            </el-date-picker>
          </div>
          <!--
          选择框
          -------------必填--------
          formType：select
          bind: 绑定值
          options: 数据源

          ------------可选----------
          尺寸： size
          多选 multiple
          多选时最多限制 multipleLimit  0不限制
          筛选 filterable
          清空 clearable
        -->
          <div v-if="item.formType === 'select'">
            <el-select v-model="formModel[item.bind]"
                       :placeholder="item.placeholder || $t('message.pleaseChoose')"
                       :disabled="item.disabled"
                       :multiple="item.multiple || false"
                       :filterable="item.filterable || false"
                       :clearable="item.clearable || false"
                       :multiple-limit="item.multipleLimit || 0">
              <el-option v-for="select in item.options"
                         :key="select.value"
                         :label="select.label"
                         :value="select.value">
              </el-option>
            </el-select>
          </div>
          <!--
            级联选择器
            -------------必填--------
            formType：cascader --必填
            bind: 绑定值   --必填
            options: 数据源  --必填

            ------------可选----------
            多选 multiple
            清空 clearable
            是否显示选中值的完整路径 showAllLevels
            是否严格的遵守父子节点不互相关联 checkStrictly
            emitPath 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
          -->
          <div v-if="item.formType === 'cascader'">
            <el-cascader v-model="formModel[item.bind]"
                         :options="item.options"
                         :clearable="item.clearable || false"
                         :show-all-levels="item.showAllLevels || false"
                         :placeholder="item.placeholder || $t('message.pleaseEnter')"
                         :disabled="item.disabled"
                         :props="{
                        expandTrigger: item.expandTrigger || 'click',
                        multiple: item.multiple || false,
                        checkStrictly: item.checkStrictly || false,
                        emitPath: item.emitPath || false,
                        value: item.valueKey || 'value',
                        label: item.labelKey || 'label'
                      }">
            </el-cascader>
          </div>
          <!--
            单选
            -------------必填--------
            formType：cascader --必填
            bind: 绑定值   --必填
            options: 数据源  --必填

            ------------可选----------
            禁用 disabled
            是否显示边框 border
          -->
          <div v-if="item.formType === 'radio'">
            <el-radio-group v-model="formModel[item.bind]" :disabled='item.disabled'>
              <el-radio  v-for="(radio, index) in item.options" :key="index" :label="radio.value">{{radio.label}}</el-radio>
            </el-radio-group>
          </div>

          <!--
            多选
            -------------必填--------
            formType：checkbox --必填
            bind: 绑定值   --必填
            options: 数据源  --必填

            ------------可选----------
            禁用 disabled
            是否显示边框 border
          -->
          <div v-if="item.formType === 'checkbox'">
            <el-checkbox-group v-model="formModel[item.bind]" :disabled='item.disabled' :border='item.border'>
              <el-checkbox label="复选框 A" v-for="(check, index) in item.options" :key="index" :disabled="check.disabled">{{check.label}}</el-checkbox>
            </el-checkbox-group>
          </div>

          <!--
            开关
            -------------必填--------
            formType：switch --必填
            bind: 绑定值   --必填
            options: 数据源  --必填

            ------------可选----------
            禁用 disabled
            打开时的值 activeValue
            关闭时的值 inactiveValue
            打开时的文字描述 activeText
            关闭时的文字描述 inactiveText
          -->
          <div v-if="item.formType === 'switch'">
            <el-switch
              v-model="formModel[item.bind]"
              :disabled="item.disabled"
              :active-value="item.activeValue || true"
              :inactive-value="item.inactiveValue || false"
              :active-text="item.activeText"
              :inactive-text="item.inactiveText">
            </el-switch>
          </div>

          <!--
            计数器
            -------------必填--------
            formType：inputNumber --必填
            bind: 绑定值   --必填
            options: 数据源  --必填

            ------------可选----------
            禁用 disabled
            设置计数器允许的最小值 min
            设置计数器允许的最大值 max
            计数器步长 step
            是否只能输入step的倍数 stepStrictly
          -->
          <div v-if="item.formType === 'inputNumber'">
            <el-input-number v-model="formModel[item.bind]"
                             :disabled="item.disabled"
                             :min="item.min"
                             :max="item.max"
                             :step="item.step"
                             :step-strictly="item.stepStrictly">
            </el-input-number>
          </div>
          <!-- 自定义render函数 -->
        </el-form-item>
      </el-form>
      <slot name="content"></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{option.cancelText || $t('message.cancel')}}</el-button>
        <el-button type="primary" @click="saveDialog">{{option.confirmText || $t('message.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // 表单列表
    formList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 表单绑定的值
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 表单校验
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 弹框的一些设置，包括表单通用设置
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    // 获取显示的表单
    formArr() {
      if (this.formList && this.formList.length) {
        const arr = this.formList.filter(item => {
          return !item.hidden
        })
        return arr
      } else {
        return []
      }
      // console.log(arr)
    }
  },
  data() {
    return {
      fullscreen: false
    }
  },
  methods: {
    /**
     * 弹窗保存
    */
    saveDialog() {
      this.$emit('save')
      this.close()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang='scss' scoped>
.titleIcon{
  i + i{
    padding-left: 20px;
  }
}
</style>
