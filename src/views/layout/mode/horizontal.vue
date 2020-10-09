<template>
  <div>
    <el-container class="app-container">
      <!-- <el-aside class="left-container" :width="isCollapse ? '90px' : '220px'">
        <hr-menu></hr-menu>
      </el-aside> -->
      <el-container class="right-container">
        <el-header class="el-header">
          <hr-header>
            <hr-menu></hr-menu>
          </hr-header>
        </el-header>
        <el-row>
          <el-col :span="8" class="text-left" v-if="isBreadCrumb">
            <q-breadcrumb></q-breadcrumb>
          </el-col>
          <el-col :span="16" class="text-right" v-if="needTagsView">
            <div class="TagsView">
              <tags-view />
            </div>
          </el-col>
        </el-row>
        <el-main>
          <hr-main></hr-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { HrHeader, HrMenu, HrMain, TagsView } from '../components'
import { mapGetters } from 'vuex'
export default {
  components: {
    HrHeader,
    HrMenu,
    HrMain,
    TagsView
  },
  computed: {
    ...mapGetters(['needTagsView', 'isBreadCrumb', 'isCollapse'])
  },
  data() {
    return {
    }
  }
}
</script>

<style lang='scss' scoped>
.breadcrumb-container {
  float: left;
}
.app-container{
  height: 100vh;
  width: 100vw;
  .left-container{
    width: 220px;
    transition: width 0.2s ease;
    background: $--color-menu;
    box-shadow: 0 0 18px rgba(42, 177, 232, 0.1);
    padding-right: 20px
  }
  .right-container{
    width: 100%;
    background: $--color-bg;
    margin-left: -20px;
    border-radius: 20px 0 0 20px;
    overflow: hidden;
    .el-header{
      background: $--color-white;
      padding: 0;
    }
    /deep/ .el-main{
      overflow-x: hidden;
      overflow: hidden;
      padding: 10px 20px;
    }
    .TagsView{
      @include fj(center);
      height: 45px;
      padding-right: 10px;
    }
  }
}
.app-container-collapse{
  height: 100vh;
  width: 100vw;
  .left-container{
    width: 90px;
    transition: width 0.2s ease;
    background: $--color-menu;
    box-shadow: 0 0 18px rgba(42, 177, 232, 0.1);
    padding-right: 20px
  }
  .right-container{
    width: 100%;
    background: $--color-bg;
    margin-left: -20px;
    border-radius: 20px 0 0 20px;
    overflow: hidden;
    .el-header{
      background: $--color-white;
      padding: 0;
    }
    /deep/ .el-main{
      overflow-x: hidden;
      overflow: hidden;
      padding: 10px 20px;
    }
    .TagsView{
      @include fj(center);
      height: 45px;
      padding-right: 10px;
    }
  }
}
</style>
