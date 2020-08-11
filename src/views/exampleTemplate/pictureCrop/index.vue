<template>
  <div class="padding10">
    <el-row>
      <el-col :span="10">
        <cropper img='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3556906815,2402486002&fm=26&gp=0.jpg' @getImg="getImg"></cropper>
      </el-col>
    </el-row>
    <div class="padding10">
      图片： {{img}}
    </div>
  </div>
</template>

<script>
import { Cropper } from 'components'
export default {
  name: 'pictureCrop',
  components: { Cropper },
  data() {
    return {
      img: ''
    }
  },
  methods: {
    getImg(val) {
      this.img = val
    }
  }
}
</script>

<style>

</style>
