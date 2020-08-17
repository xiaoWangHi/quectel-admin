<template>
  <div class="padding10 tabs-container">
    <el-form label-width="140px" :model="formData" size='mini'>
      <el-form-item label="标签风格">
        <el-radio-group v-model="formData.tabType">
          <el-radio label=''>默认</el-radio>
          <el-radio label="card">选项卡样式</el-radio>
          <el-radio label="border-card">卡片样式</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='标签是否可关闭'>
        <el-switch v-model="formData.closable"></el-switch>
      </el-form-item>
      <el-form-item label="标签宽度是否自撑开">
        <el-switch v-model="formData.stretch"></el-switch>
      </el-form-item>
      <el-form-item label="标签3 禁用">
        <el-switch v-model="tabList[2].disabled"></el-switch>
      </el-form-item>
    </el-form>
    <q-index-tabs :innerList="tabList"
                :tabPosition="formData.tabPosition"
                :tabType='formData.tabType'
                :closable="formData.closable"
                :stretch='formData.stretch'
                @tabClick='tabClick'
                @tabRemove="tabRemove"></q-index-tabs>
  </div>
</template>

<script>
import TabsOne from '../table/index.vue'
import TabsTwo from '../icon/index.vue'
import TabsThree from '../button/index.vue'
export default {
  name: 'tabs',
  components: { TabsOne, TabsTwo, TabsThree },
  data() {
    return {
      formData: {
        tabPosition: 'top',
        tabType: '', // 标签风格
        closable: false,
        stretch: false
      },
      tabList: [
        {
          label: this.$t('menu.tabs') + 1,
          name: this.$t('menu.tabs') + 1,
          disabled: false,
          render: (h, context) => {
            return h(TabsOne, { ref: 'one' })
          }
        },
        {
          label: this.$t('menu.tabs') + 2,
          name: this.$t('menu.tabs') + 2,
          disabled: false,
          render: (h, context) => {
            return h(TabsTwo, { ref: 'two' })
          }
        },
        {
          label: this.$t('menu.tabs') + 3,
          name: this.$t('menu.tabs') + 3,
          disabled: false,
          render: (h, context) => {
            return h(TabsThree, { ref: 'three' })
          }
        }
      ]
    }
  },
  methods: {
    /* 标签点击*/
    tabClick(item) {
      this.$message.success(`您点击了标签【${item.name}】`)
    },
    /**
     * 标签删除
    */
    tabRemove(item) {
      this.$message.error(`您点击了标签【${item}】的删除按钮！`)
    }
  }
}
</script>

<style lang='scss' scoped>
.tabs-container{
  width: 100%;
  height: 100%;
}
</style>
