<template>
<div>
  <div class="cropperHeader">
    <span class="font14 titleColor h3">图片剪裁</span>
  </div>
  <slot name="header"></slot>
  <el-row :gutter="20">
    <el-col :span="18">
      <div class="cropperDiv">
        <vueCropper ref="cropper"
          :img="options.img"
          :style="{height: height || '200px'}"
          :outputSize="options.size"
          :outputType="options.outputType"
          :info="true"
          :full="options.full"
          :canMove="options.canMove"
          :canMoveBox="options.canMoveBox"
          :original="options.original"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          :enlarge="options.enlarge"
          :centerBox="options.centerBox"
          :fixedNumber="options.fixedNumber"
          :fixed="options.fixed"
          :maxImgSize="options.maxImgSize"
          :title="options.title"
          :details="options.details"
          :obj="obj"
          @realTime="realTime">
        </vueCropper>
        <div class="buttonList">
          <label class="el-button el-button--primary el-button--small" for="uploads">选择图片</label> &nbsp;&nbsp;&nbsp;
          <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event, 1)">
          <el-button  @click="changeScale(1)" icon="el-icon-zoom-in"></el-button>
          <el-button  @click="changeScale(-1)" icon="el-icon-zoom-out"></el-button>
          <el-button  @click="rotateLeft" icon="el-icon-refresh-left"></el-button>
          <el-button  @click="rotateRight" icon="el-icon-refresh-right"></el-button>
        </div>
        <div class="buttonList flex-center">
          <el-button type="primary" size="small" @click="finish('base64')">{{$t('message.confirm')}}</el-button>
          <el-button type="primary" size="small">{{$t('message.cancel')}}</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="show-preview">
        <div>
          <img :src="imgsrc">
        </div>
      </div>
      <div class="show-preview mt2" style="'borderRadius': '50%'">
        <img :src="imgsrc">
      </div>
    </el-col>
  </el-row>

  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: { VueCropper },
  props: {
    // 组件高度
    height: {
      type: String,
      default: '300px'
    },
    img: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: Number,
      default: 1
    },
    outputType: {
      type: String,
      default: 'png | jpeg | jpg'
    },
    autoCropWidth: {
      type: Number,
      default: 200
    },
    autoCropHeight: {
      type: Number,
      default: 200
    },
    canMove: {
      type: Boolean,
      default: true
    },
    canMoveBox: {
      type: Boolean,
      default: true
    },
    centerBox: {
      type: Boolean,
      default: false
    },
    fixedBox: {
      type: Boolean,
      default: false
    },
    tit: {
      type: String,
      default: '图像裁剪'
    },
    details: {
      type: String,
      default: '图片不超过1024kb，可自选，随随便便图片不超过，可自选，随随便便图片不超过，可自选，随随便便图片不超过，可自选，随随便便'
    },
    autoCrop: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '图像裁剪'
    },
    full: {
      type: Boolean,
      default: false
    },
    original: {
      type: Boolean,
      default: false
    },
    enlarge: {
      type: Number,
      default: 1
    },
    fixed: {
      type: Boolean,
      default: true
    },
    fixedNumber: {
      type: Array,
      default: () => [10, 10]
    },
    maxImgSize: {
      type: Number,
      default: 2000
    },
    obj: {
      type: Object
    }
  },
  data() {
    return {
      options: {
        img: this.img,
        outputSize: this.size,
        outputType: this.outputType,
        full: this.full,
        canMove: this.canMove,
        canMoveBox: this.canMoveBox,
        original: this.original,
        autoCrop: this.autoCrop,
        autoCropWidth: this.autoCropWidth,
        autoCropHeight: this.autoCropHeight,
        fixedBox: this.fixedBox,
        enlarge: this.enlarge,
        centerBox: this.centerBox,
        fixed: this.fixed,
        fixedNumber: this.fixedNumber,
        maxImgSize: this.maxImgSize,
        title: this.title,
        details: this.details
      },
      // crap: false,
      previews: {},
      modelSrc: '',
      previewsw: 200,
      previewsh: 200,
      imgsrc: '',
      scaleratioXY: 1
    }
  },
  computed: {
    scaleFun: function() {
      var scale = this.scaleratioXY
      return `transform:scale(${scale},${scale})`
    }
  },
  methods: {
    // updateObj: function () {
    //   this.$nextTick(function () {
    //     console.log(this.$el.textContent) // => 'updated'
    //   })
    // },
    close() {
      // this.$emit('ontrigger');
      this.$emit('closeflag')
      this.props = ''
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    finish(type) {
      var that = this
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true
          this.modelSrc = data
          var dats = { img: data }
          that.$emit('getImg', dats)
          if (this.options.img === '') {
            alert('您还没有选择图片')
          } else {
            // this.$emit('ontrigger');
            // this.close();
            this.$emit('closeflag')
            this.props = ''
          }
        })
      }
    },
    realTime(data) {
      var that = this
      var dataoption = data
      this.$refs.cropper.getCropData(data => {
        that.imgsrc = data
        if (dataoption.w >= 200 || dataoption.h >= 200) {
          if (dataoption.w >= dataoption.h) {
            that.scaleratioXY = 200 / dataoption.w
          }
          if (dataoption.h > dataoption.w) {
            that.scaleratioXY = 200 / dataoption.h
          }
        }
      })
    },
    imgLoad(msg) {
      console.log(msg)
    },
    uploadImg(e, num) {
      // 上传图片
      // this.option.img
      var that = this
      var file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          that.options.img = data
          // var dat = {img: data};
          // that.$emit('updateimg', dat);
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      reader.readAsDataURL(file)
      // 转化为blob
      // reader.readAsArrayBuffer(file)
    }
  }
}
</script>

<style lang='scss' scoped>
.cropperHeader{
  position: relative;
  height: 40px;
  line-height: 40px;
}
.buttonList{
  padding-top: 10px;
}
.show-preview{
  @include fj(center);
  width: 110px;
  height: 110px;
  overflow: hidden;
  border: 2px solid $--color-bg;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-top: 10px;
  img{
    width: auto;
    height: auto;
    max-width: 100px;
    max-height: 100px;
  }
}
</style>
