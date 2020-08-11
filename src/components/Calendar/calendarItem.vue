<template>
  <div class="calendartItem-container">
    <el-popover
      placement="bottom"
      width="150"
      :disabled="list && hiddenList && hiddenList.length ? false : true"
      trigger="hover">
      <!-- 隐藏的list -->
      <div v-if="hiddenList && hiddenList.length" class="calendartItem">
        <div v-for="(item, index) in hiddenList" :key="index">
          <div class="listItem" :class="'item-bg-' + (item.type || 'primary')">
            <i class="iconfont " :class="item.icon"></i>
            <p class="text">{{item.text}}</p>
          </div>
        </div>
      </div>
      <div class="calendartItem" slot="reference">
        <div class="fj">
          <div class="day">{{day}}</div>
          <i class="iconfont " :class="icon"></i>
        </div>
        <div v-if="list && list.length">
          <div v-for="(item, index) in showList" :key="index">
            <div class="listItem" :class="'item-bg-' + (item.type || 'primary')">
              <i class="iconfont " :class="item.icon"></i>
              <p class="text">{{item.text}}</p>
            </div>
          </div>
        </div>
        <div v-if="text" class="textContent">{{text}}</div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: String,
      default: () => {
        return ''
      }
    },
    icon: {
      type: String,
      default: () => {
        return 'iconpin'
      }
    },
    list: { // type:  primary  danger  warning  success
      type: Array,
      default: () => {
        return []
      }
    },
    text: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  computed: {
    showList() {
      const data = JSON.parse(JSON.stringify(this.list))
      if(data && data.length) {
        return data.length > 3 ? data.slice(0, 3) : data
      } else {
        return []
      }
    },
    hiddenList() {
      const data = JSON.parse(JSON.stringify(this.list))
      if(data && data.length && data.length > 3) {
        return data.slice(3)
      } else {
        return []
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.calendartItem-container{
 height: 100%;
}
.calendartItem{
  overflow: hidden;
  width: 100%;
  height: 100%;
  .listItem{
    @include fj(flex-start);
    line-height: 20px;
    background: red;
    overflow: hidden;
    color: #fff;
    padding: 0 2px;
    i{
      font-size: 14px;
      margin-right: 4px;
    }
    .text{
      @include ellipsis;
      width: 100%;
      font-size: 12px;
    }
  }
  .textContent{
    @include ellipsis3;
    white-space: wrap;
    height: 100%;
    line-height: 20px;
    word-wrap: break-word;
    width: 100px;
  }
  .item-bg-primary{
      background: $--color-primary;
  }
  .item-bg-success{
      background:  $--color-success;
  }
  .item-bg-warning{
      background:  $--color-warning;
  }
  .item-bg-danger{
      background: $--color-danger;
  }
}
</style>
