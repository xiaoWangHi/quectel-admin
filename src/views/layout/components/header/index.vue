<template>
  <el-header class="header-container">
    <div class="left titleColor h3"> <i class="iconfont iconlist menuIcon" :class="isCollapse ? 'collapse-active' : 'collapse'" @click="collapseChange"></i> &nbsp; Quectel 管理系统</div>
    <div class="right">
      <slot></slot>
      <!-- 日期 -->
      <span class="placeholder font12">{{date}} &nbsp;&nbsp; {{week}}</span>
      <!-- 提醒 -->
      <el-badge is-dot>
        <i class="el-icon-bell icon font24 pointer transition"></i>
      </el-badge>
      <!-- 中英文切换 -->
      <i class="iconfont icon font24 pointer transition" :class="lang === 'en' ? 'iconzhongwen' : 'iconyingwen'" @click="changeLanguage"></i>
      <!-- 设置 -->
      <setting-view></setting-view>
      <!-- 头像及信息 -->
      <div class="avatar pointer">
        <el-popover
          placement="bottom"
          width="60"
          trigger="hover">
          <div class="text-center">
            <div class="padding" style="padding-bottom: 6px">
              <el-link :underline="false">{{$t('message.userInfo')}}</el-link>
            </div>
            <div class="padding">
              <el-link :underline="false" @click="logout"> <i class="iconfont icontuichu"></i> {{$t('message.logout')}}</el-link>
            </div>
          </div>
          <div slot="reference" class="fj">
            <el-avatar size="small" :src="squareUrl"></el-avatar>
            <p class="name titleColor">{{showDay()}}</p>
          </div>
        </el-popover>
      </div>
    </div>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
import format from 'utils/format'
import { SettingView } from '../index'
export default {
  components: { SettingView },
  computed: { ...mapGetters(['date', 'userInfo', 'isCollapse']) },
  inject: ['reload'],
  data() {
    return {
      week: format.getWeekDate(),
      lang: localStorage.lang || 'cn',
      squareUrl: 'http://meisudci.oss-cn-beijing.aliyuncs.com/bn_thumb/MSBQ13715300094369.jpg?x-oss-process=style/bn_info_thumb'
    }
  },
  methods: {
    /**
     * 登出
    */
    logout() {
      this.$router.push('/login')
    },
    /**
     * 切换侧边栏样式
    */
    collapseChange() {
      this.$store.dispatch('setCollapse', !this.isCollapse)
    },
    /*
    * 切换中英文
    */
    changeLanguage() {
      if(localStorage.lang === 'en') {
        this.$i18n.locale = 'cn'
        localStorage.setItem('lang', 'cn')
      } else {
        this.$i18n.locale = 'en'
        localStorage.setItem('lang', 'en')
      }
      this.reload() // 刷新页面，修复深层组件中英文切换
    },
    /**
     * 问候
    */
    showDay() {
      const now = new Date()
      const hour = now.getHours()
      const name = this.userInfo.name || 'Admin'
      if (hour < 13) {
        return this.$t('message.goodMorning') + ', ' + name
      } else if (hour < 18) {
        return this.$t('message.goodAfternoon') + ', ' + name
      } else if (hour < 24) {
        return this.$t('message.goodEvening') + ', ' + name
      } else {
        return '' + name
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .header-container{
    @include fj;
    align-items: center;
    padding: 0 20px !important;
    .menuIcon{
      display: inline-block;
      font-size: 14px;
      font-weight: 900;
      margin-right: 10px;
      cursor: pointer;
    }
    .collapse-active{
      transform:rotate(90deg);
      -moz-transform:rotate(90deg);
      -webkit-transform:rotate(90deg);
      transition: all 0.5s;
    }
    // .left{
    // }
    .right{
      @include fj;
      .icon {
        color: $--color-gray-b;
        margin-left: 20px;
      }
      .icon:hover{
        color: $--color-primary
      }
      .avatar{
        @include fj;
        margin-left: 20px;
        .name{
          margin: 0 10px;
        }
        .name:hover{
          color: $--color-primary
        }

      }
    }
  }
</style>
