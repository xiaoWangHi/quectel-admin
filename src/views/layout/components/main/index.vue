<template>
  <section class="app-main">
    <el-backtop target=".app-main" v-if="upBtn"></el-backtop>
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive> -->
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  methods: {
    clideUpBtn() {
      this.$store.dispatch('global/setUpBtn', false)
    }
  },
  computed: {
    ...mapGetters(['upBtn']),
    cachedViews() {
      return _.join(this.$store.state.tagsView.cachedViews, ',')
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang='scss' scoped>
.app-main{
  flex: 1;
  text-align: left;
  height: 100%;
  background: $--color-white;
  border-radius: 20px;
  overflow-y: auto
}
</style>
