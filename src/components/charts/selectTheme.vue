<template>
  <div class="themeDiv">
    <div v-for="(item, index) in themeList" :key="index">
      <el-popover
        placement="top"
        width="150"
        trigger="hover">
        <div class="colorList">
          <div class="colorItem" v-for="(color, cIndex) in item.json.color" :key="cIndex" :style="{ background: color}"></div>
        </div>
        <span slot="reference">
          <div class="colorDiv" :class="value === item.name ? 'colorDivActive' : ''" @click="themeChange(item)">
            <div class="color" :style="{ background: `linear-gradient(135deg, ${item.json.color[0]} 0%, ${item.json.color[0]} 50%, ${item.json.color[1]} 51%, ${item.json.color[1]} 100%)`}"></div>
          </div>
        </span>
      </el-popover>
    </div>
  </div>
</template>

<script>
import Theme from './theme'
export default {
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      themeList: Theme
    }
  },
  methods: {
    themeChange(item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style lang='scss' scoped>
.themeDiv{
  @include fj(flex-end);
  padding-right: 20px;
}
.colorDiv{
  @include fj(center);
  width: 26px;
  height: 26px;
  border: 1px solid rgba(0,0,0,0);
  background: $--color-white;
  margin-left: 10px;
  cursor: pointer;
}

.colorDiv:hover{
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}
.colorDivActive{
  border: 1px solid $--color-primary;
}
.color{
  width: 20px;
  height: 20px;
  margin: auto;
  // background: linear-gradient(135deg, #c23531 0%, #c23531 50%, #547b95 51%, #547b95 100%);
}
.colorList{
  @include fj(flex-start);
  flex-wrap: wrap;
  .colorItem{
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-bottom: 10px;
    content: ' ';
  }
}

</style>
