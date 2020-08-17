<template>
  <div class="padding10">
    <!-- 单文件上传 -->
    <div class="exampleDiv">
      <div class="title h3">单文件上传：</div>
      <q-upload action="" :data='{}'>
        <div slot="upload-btn">
            <img v-if="serviceForm.pic" :src="serviceForm.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </q-upload>
    </div>
    <!-- 多文件上传 -->
    <div class="exampleDiv">
      <div class="title h3">多文件上传：</div>
    </div>
    <!-- 上传文件类型限制 -->
    <div class="exampleDiv">
      <div class="title h3">上传文件类型限制：</div>
    </div>
    <!-- 上传文件数量限制 -->
    <div class="exampleDiv">
      <div class="title h3">上传文件数量限制：</div>
    </div>
    <!-- 拖拽上传 -->
    <div class="exampleDiv">
      <div class="title h3">拖拽上传:</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'update',
  data() {
    return {
      serviceForm: {
        pic: ''
      }
    }
  }
}
</script>

<style lang='scss' scoped>
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
    }
    .avatar-uploader-icon:hover {
      color: $--color-primary;
      border-color: $--color-primary;
    }
    .avatar:hover {
      border-color: $--color-primary;
    }
</style>
