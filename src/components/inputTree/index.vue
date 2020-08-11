<template>
  <div class="user-select">
    <el-dropdown trigger="click" ref="inputTreeDrop">
      <el-input class="input-select el-dropdown-link"
        v-model="inputName"
        :placeholder="placeholder || $t('message.pleaseChoose')"
        :clearable="clearable || false"
        @focus="focusData"
        size="mini"
        @clear="clear"></el-input>
      <el-dropdown-menu slot="dropdown">
        <div class="tree-box pr2">
          <el-tree
            class="filter-tree"
            ref="inputTree"
            :data="option.trees"
            :props="option.defaultProps"
            :node-key="option.property || 'id'"
            :default-expand-all ="option.expand"
            :filter-node-method="filterNode"
            :accordion="option.accordion"
            :highlight-current="option.highlight"
            :show-checkbox="option.checkbox"
            :expand-on-click-node="false"
            :check-strictly="option.strictly"
            @node-click="nodeClick">
          </el-tree>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'inputTree',
  props: {
    option: {
      type: Object,
      default: {
        expand: false,
        accordion: true, // 是否每次只打开一个同级树节点展开
        highlight: true, // 是否高亮当前选中节点，默认值是 false
        checkbox: false,
        strictly: true
      }
    },
    treeForm: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    focusData(val) {
      this.$refs.inputTree.filter('')
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    nodeClick(data, node, self) {
      this.inputName = data[this.option.defaultProps.label]
      this.treeForm[this.option.inputVal] = data.id
      this.$emit('change', data, node, self)
      this.$refs.inputTreeDrop.hide()
    },
    clear() {
      this.treeForm[this.option.inputVal] = ''
      this.$emit('change')
    }
  },
  data() {
    return {
      inputName: ''
    }
  },
  watch: {
    inputName(val) {
      this.$refs.inputTree.filter(val)
    }
  }
}
</script>

<style lang="scss">
  .user-select {
    .input-select{
      width:250px;
    }
  }
  .tree-box {
    width:250px;
    overflow-x: auto;
    height: 150px;
    overflow-y: auto;
    .el-tree-node {
      white-space: break-spaces;
    }
  }
</style>
