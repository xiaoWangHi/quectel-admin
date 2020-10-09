<template>
  <div :class="isCollapse ? 'menu-container-collapse' : 'menu-container'">
    <div class="img-box">
      <img v-if="isCollapse" src="../../../../assets/images/quectel-white-red.png" alt="">
      <img v-else src="../../../../assets/images/logo297.png" alt="">
    </div>
    <div class="menu-content">
      <el-menu router :default-active="activeIndex" :text-color="isCollapse ? '#1e1e1e' : '#fff'" :active-text-color="isCollapse ? '#2ab1e8' : '#fff'" :collapse='isCollapse' mode='horizontal' :collapse-transition='false'>
        <div v-for="(item, index) in menuRoute" :key="index">
          <!-- 一级菜单 -->
          <router-link tag="div" v-if="!item.children || !item.children.length" replace :to="resolvePath(item.path)">
            <el-menu-item :index="item.path">
              <div class="title" v-if="isCollapse">
                <i class="iconfont" :class="item.meta.icon"></i>
              </div>
              <div class="title" v-else>
                <i class="iconfont" :class="item.meta.icon"></i>
                <span slot="title">{{$t('menu.' + item.meta.title)}}</span>
              </div>
            </el-menu-item>
          </router-link>
          <div v-else>
            <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow">
              <router-link tag="div" replace :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)">
                  <div class="title" v-if="isCollapse">
                    <i class="iconfont" :class="onlyOneChild.meta.icon"></i>
                  </div>
                  <div class="title" v-else>
                    <i class="iconfont" :class="onlyOneChild.meta.icon"></i>
                    <span>{{$t('menu.' + onlyOneChild.meta.title)}}</span>
                  </div>
                </el-menu-item>
              </router-link>
            </template>
            <el-submenu :index="item.path" v-else>
              <template slot="title" v-if="isCollapse">
                <i class="iconfont" :class="item.meta.icon"></i>
              </template>
              <template slot="title" v-else>
                <i class="iconfont" :class="item.meta.icon"></i>
                <span>{{$t('menu.' + item.meta.title)}}</span>
              </template>
              <router-link tag="div" v-for="(child, cIndex) in item.children" :key="cIndex" replace :to="resolvePath(child.path)">
                <el-menu-item :index="child.path">
                  <div :class="activeIndex === child.path ? 'child-title-active' : 'child-title'">
                    <i class="iconfont" :class="child.meta.icon"></i>
                    <span>{{$t('menu.' + child.meta.title)}}</span>
                  </div>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </div>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'
import v from 'utils/validate'
export default {
  computed: {
    ...mapGetters(['permission_routes', 'menuActive', 'isCollapse']),
    activeIndex() {
      return this.$route.path
    },
    menuRoute() {
      const arr = this.permission_routes.filter(item => {
        if(!item.hidden && item.children && item.children.length) {
          const children = item.children.filter(child => {
            return !child.hidden
          })
          item.children = children
        }
        return !item.hidden
      })
      return arr
    }
  },
  data() {
    this.onlyOneChild = null
    return {
      squareUrl: '../../../../assets/images/quectel.jpg',
      menuList: []
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // 如果只有一个显示子级，将使用该集
          this.onlyOneChild = item
          return true
        }
      })
      // 如果子集只有一个，默认展示到父集
      if (showingChildren.length === 1) {
        return true
      }
      // 如果没有子路由器要显示，请显示父
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (v.isExternal(routePath)) {
        return routePath
      }
      if (v.isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang='scss' scoped>
.menu-container {
  @include fc;
  height: 100%;
  background: url('../../../../assets/images/bg.png') no-repeat center center;
  background-size: cover;
  overflow: hidden;
  .img-box{
    width: 160px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 20px;
    border-bottom: 1px solid rgba(250, 250, 250, 0.15);
    img{
      width: auto;
      height: auto;
      max-width: 160px;
      max-height: 40px;
    }
  }
  .menu-content{
    flex: 1;
    width: 100%;
    overflow-y: auto;
    /deep/ .el-menu{
      border-right: none;
      background: rgba(255, 255, 255, 0);
      i{
        color: $--color-white;
        margin-right: 10px;
      }
      .el-menu-item{
        position: relative;
      }
      .el-menu-item{
        position: relative;
        padding-left: 0 !important;
        .title{
          padding-left: 20px;
        }
        .child-title, .child-title-active{
          padding-left: 40px;
        }
      }
      .is-active{
        .el-submenu__title{
             background: rgba(255, 255, 255, 0.08);
        }
        .title,.child-title-active{
          position: absolute;
          left: 0;
          top: 50%;
          width: 90%;
          height: 40px;
          line-height: 40px;
          margin-top: -20px;
          // background: rgba(255, 255, 255, 0.8);
          background: $--color-white;
          border-radius: 0 20px 20px 0;
          font-weight: 550;
          color:  $--color-menu;
          i{
            color: $--color-menu
          }
        }
      }
      .el-submenu__title,.el-menu-item,.el-menu-item-group__title{
        text-align: left;
      }
      .el-menu-item:hover {
        background-color: rgba(255,255,255,0.1) !important;
      }
      .el-menu-item:focus{
        background-color: rgba(0,0,0,0) !important;
      }
      .el-submenu__title:hover{
        background-color: rgba(0,0,0,0) !important
      }
    }
  }
  .menu-content::-webkit-scrollbar {
    width : 0px;
    height: 10px;
  }
  .menu-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0);
  }
  .menu-content::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
}
.menu-container-collapse{
  @include fc;
  height: 100%;
  background: url('../../../../assets/images/bg.png') no-repeat center center;
  background-size: cover;
  overflow: hidden;
  .img-box{
    width: 60px;
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 6px;
    border-bottom: 1px solid rgba(250, 250, 250, 0.15);
    img{
      width: auto;
      height: auto;
      max-width: 90px;
      max-height: 60px;
    }
  }
  .menu-content{
    flex: 1;
    width: 100%;
    overflow-y: auto;
    /deep/ .el-menu{
      border-right: none;
      background: rgba(255, 255, 255, 0);
      i{
        color: $--color-white;
        margin-right: 10px;
        font-size: 18px;
      }
      .el-menu-item{
        position: relative;
      }
      .el-menu-item{
        position: relative;
        padding-left: 0 !important;
        .title{
          padding-left: 20px;
        }
        .child-title, .child-title-active{
          padding-left: 40px;
        }
      }
      .el-icon-arrow-right{
        display: none;
      }
      .is-active{
        .el-submenu__title, .el-submenu__title:hover{
          position: absolute;
          left: 0;
          top: 50%;
          width: 90%;
          height: 40px;
          line-height: 40px;
          // margin-top: -20px;
          background: $--color-white;
          border-radius: 0 20px 20px 0;
          font-weight: 550;
          color:  $--color-menu;
          i{
            color: $--color-menu
          }
        }
        .title,.child-title-active{
          position: absolute;
          left: 0;
          top: 50%;
          width: 90%;
          height: 40px;
          line-height: 40px;
          margin-top: -20px;
          background: $--color-white;
          border-radius: 0 20px 20px 0;
          font-weight: 550;
          color:  $--color-menu;
          i{
            color: $--color-menu
          }
        }
      }
      .el-submenu__title,.el-menu-item,.el-menu-item-group__title{
        text-align: left;
      }
      .el-menu-item:hover {
        background-color: rgba(255,255,255,0.1) !important;
      }
      .el-menu-item:focus{
        background-color: rgba(0,0,0,0) !important;
      }
    }
  }
  .menu-content::-webkit-scrollbar {
    width : 0px;
    height: 10px;
  }
  .menu-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0);
  }
  .menu-content::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
}
</style>
