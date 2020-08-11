<template>
  <div class="padding10">
    <div class="exampleDiv">
      <div class="title h3">Iconfont Icon</div>
      <div class="fj iconDiv">
        <div v-for="(icon, index) in iconJson.glyphs" :key="index" class="iconItem">
          <i class="textColor font28" :class="'iconfont icon' + icon.font_class"></i>
          <br>
          <span class="font12 flex-wrap">{{'icon' + icon.font_class}}</span>
        </div>
      </div>
    </div>
    <div class="exampleDiv">
      <div class="title h3">Element Icon</div>
        <div class="fj iconDiv">
        <div v-for="(icon, index) in elementIcon" :key="index" class="iconItem">
          <i class="textColor font28" :class="'el-icon-' + icon"></i>
          <span class="font12 flex-wrap">{{icon}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconJson from '../../../assets/iconfont/iconfont.json'
import elementIcon from './element-icons'
export default {
  name: 'icon',
  data() {
    return {
      iconJson: iconJson,
      elementIcon: elementIcon
    }
  },
  methods: {
    init() {}
  }
}
</script>

<style lang='scss' scoped>
.iconDiv{
  @include flex-wrap;
  .iconItem{
    @include fc(center);
    cursor: pointer;
    width: 120px;
    height: 120px;
    border-radius: 6px;
    transition: all 0.5s;
    overflow: hidden;
    span{
      display: inline-block;
      width: 120px;
      text-align: center;
      flex-wrap: wrap;
    }
  }
  .iconItem:hover{
    background: rgba(42, 177, 232, 0.1);
    i{
      color: $--color-primary;
    }
    color: $--color-primary;
  }
}
</style>
