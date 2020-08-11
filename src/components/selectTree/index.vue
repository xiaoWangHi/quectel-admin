<template>
  <div class="tree-container">
    <el-row :gutter="20">
      <el-col :span="showCheckbox ? 12 : 24" class="tree-item left">
          <h3>
            <i class="iconfont iconshuxian color-primary"></i>
            {{$t('message.pleaseChoose') + title}}
          </h3>
          <el-input
            size="mini"
            :placeholder="$t('message.enterKeyWordsToFilter')"
            v-model="filterLeftText">
          </el-input>
          <div class="treeDiv">
            <el-tree
              class="filter-tree"
              :data="option"
              :node-key="nodeKey"
              :show-checkbox="showCheckbox"
              :check-strictly='checkStrictly'
              :props="defaultProps"
              default-expand-all
              highlight-current
              @check-change="handleCheckChange"
              :filter-node-method="filterMethod"
              ref="leftTree">
            </el-tree>
          </div>
      </el-col>
      <el-col :span="12" class="tree-item right" v-if="showCheckbox">
          <h3>
            <i class="iconfont iconshuxian color-primary"></i>
             {{$t('message.chosen') + title}}
          </h3>
          <el-input
            size="mini"
            :placeholder="$t('message.enterKeyWordsToFilter')"
            v-model="filterRightText">
          </el-input>
          <div class="treeDiv">
            <el-tree
              class="filter-tree"
              :data="selectData"
              highlight-current
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterMethod"
              ref="rightTree">
            </el-tree>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * tree选择器
*/
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    selectIds: {
      type: Array, default: () => {
        return []
      }
    },
    checkStrictly: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    nodeKey: {
      type: String,
      default: () => {
        return 'id'
      }
    },
    option: {
      type: Array,
      default: () => {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      filterLeftText: '', // 左边筛选
      filterRightText: '', // 右边筛选
      selectData: [], // 已选对象
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    handleCheckChange() {
      const checkedNodes = this.$refs.leftTree.getCheckedNodes()
      this.$emit('checkChange', this.$refs.leftTree.getCheckedKeys())
      this.selectData = this.toTree(checkedNodes)
    },
    /**
     * 筛选
    */
    filterMethod(query, item) {
      return item.name.indexOf(query) > -1
    },
    /**
     * 得到树
    */
    toTree(data) {
      const result = []
      if (!Array.isArray(data)) {
        return result
      }
      data.forEach((item) => {
        delete item.children
      })
      const map = {}
      data.forEach((item) => {
        map[item.id] = item
      })
      data.forEach((item) => {
        const parent = map[item.parent]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          result.push(item)
        }
      })
      return result
    },
    /**
     * 清空
    */
    clear() {
      this.filterLeftText = '' // 左边筛选
      this.filterRightText = '' // 右边筛选
    }
  },
  watch: {
    filterLeftText(val) {
      this.$refs.leftTree.filter(val)
    },
    filterRightText(val) {
      this.$refs.rightTree.filter(val)
    },
    selectIds: {
      deep: true,
      handler(val) {
        this.$refs.leftTree.setCheckedKeys(val)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  @import 'src/styles/variables.scss';

.tree-container{
  overflow: hidden;
  .tree-item{
    padding: 0 10px;
    .treeDiv{
      padding-top: 20px;
      width: 100%;
      min-height: 300px;
      max-height: 440px;
      overflow: auto;
    }
  }
  .left{
    border-right: 1px $border-dashed $c-border;
  }
    /deep/ .el-dialog__body{
    padding: 0 !important;
  }
}
</style>