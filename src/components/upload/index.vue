<template>
  <div class="qt-upload">
    <el-upload
      :ref="uploadRef"
      :action="actionUrl"
      :data="data"
      :multiple="multiple"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-progress="progress"
      :on-change="change"
      :before-upload="beforeUpload"
      :on-success="success"
      :file-list="fileList"
      :show-file-list="showFileList"
      :auto-upload="autoUpload"
      :disabled="disabled">
      <!-- 按钮插槽 -->
      <slot name="upload-btn">
        <el-button size="mini" icon="el-icon-upload">{{$t('message.upload')}}</el-button>
      </slot>
      <!-- 提示语插槽 -->
      <div slot="tip" class="el-upload__tip mt1">
        <slot name="upload-tip">
        </slot>
      </div>
    </el-upload>
    <!-- 自定义上传附件列表 -->
    <div v-if="selfFileList">
      <slot name="file-list">
        <div class="file-info" v-for="(item, index) of fileList" :key="index">
          <i class="at icon-paperclip"/>
          <span class="color-primary pointer" @click="download(item)">{{item.name}}</span>
          <i class="delete-btn el-icon-circle-close" @click="handleRemove(item, fileList)" />
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'upload',
  props: {
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    fileList: {
      type: Array,
      default: () => []
    },
    drag: { // 是否支持拖拽
      type: Boolean,
      default: false
    },
    autoUpload: { // 是否自动上传
      type: Boolean,
      default: true
    },
    ownerId: { // 上传附件的ownerId
      type: String,
      default: ''
    },
    showFileList: { // 是否展示默认的列表
      type: Boolean,
      default: false
    },
    selfFileList: { // 是否展示手写的文件列表
      type: Boolean,
      default: false
    },
    multiple: { // 是否可支持多选
      type: Boolean,
      default: false
    },
    action: { // 上传action地址路径
      type: String,
      default: () => {
        return process.env.BASE_API + window.config.project_url + 'file/upload'
      }
    },
    data: { // 上传时携带的参数额外
      type: Object,
      default: () => {}
    },
    thumbImage: { // 图片是否要生成缩略图
      type: Boolean,
      default: false
    },
    uploadRef: { // 上传附件的ref
      type: String,
      default: 'upload'
    }
  },
  components: {},
  data() {
    return {
      // actionUrl: '',
      fileType: ''
    }
  },
  computed: {
    headers() {
      return {
        Authorization: this.$store.getters.token
      }
    },
    actionUrl() {
      return this.action
    }
  },
  methods: {
    uploadUrl(name) {
      return (this.thumbImage && (name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.jpeg')))
        ? process.env.BASE_API + window.config.project_url + 'file/uploadR_thumbImage'
        : process.env.BASE_API + window.config.project_url + 'file/upload'
    },
    getToken,
    handleRemove(file, fileList) {
      this.$emit('remove', file, fileList)
    },
    handlePreview(file) {
      this.$emit('priview', file)
    },
    beforeUpload(file) {
      this.fileType = file.name
      this.$emit('beforeUpload', file)
    },
    change(file, fileList) {
      this.$emit('change', file, fileList)
    },
    progress(event, file, fileList) {
      this.$emit('progress', event, file, fileList)
    },
    download(item) {
      console.log(item.id)
    },
    success(response, file, fileList) {
      this.$emit('success', response, file, fileList)
    }
  },
  mounted() {
    // this.actionUrl = this.action
  },
  watch: {
    // fileType(val) {
    //   console.log(val)
    //   this.actionUrl = this.uploadUrl(val)
    // }
  }
}
</script>

<style lang="scss">
  .qt-upload {
    .file-info {
      .delete-btn {
        display: none;
      }
    }
    .file-info:hover {
      display: inline-block;
    }
    .el-upload-list__item {
      min-height: 28px;
    }
    .el-upload-list__item-name {
      float: left;
    }
    .el-upload-list__item .el-icon-close {
      position: initial;
    }
  }
</style>
