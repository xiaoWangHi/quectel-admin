<template>

    <el-popover
      placement="bottom"
      width="60"
      trigger="hover">
      <div class="text-center">
        <el-form label-position='right' label-width="80px">
          <el-form-item label="面包屑">
            <el-switch v-model="isBread" @change="setBread"></el-switch>
          </el-form-item>
          <el-form-item label="快速标签">
            <el-switch v-model="isNeedTags" @change="setNeedTags"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div slot="reference" class="fj">
        <i class="el-icon-setting icon font24 pointer transition placeholder"></i>
      </div>
    </el-popover>

</template>

<script>
export default {
  data() {
    return {
      isNeedTags: this.$store.getters.needTagsView,
      isBread: this.$store.getters.isBreadCrumb,
      value1: false
    }
  },
  methods: {
    setBread(val) {
      this.$store.dispatch('setBreadCrumb', val)
    },
    setNeedTags(val) {
      this.$store.dispatch('tagsView/setNeedTagsView', val)
    }
  }
}
</script>

<style lang='scss' scoped>
.icon {
  color: $--color-gray-b;
  margin-left: 20px;
}
</style>
