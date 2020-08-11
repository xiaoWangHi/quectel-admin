<template>
  <div class="role-list">
    <div v-if="title" class="title titleColor font16 mb1">{{title}}</div>
    <div class="buttonList">
      <el-button v-if="options.add" class="button-item" type="primary" size="mini" icon="el-icon-plus" @click="btnClick('add')">{{$t('message.add') + options.addTitle}}</el-button>
      <span class="button-item" v-if="buttonList && buttonList.length">
        <el-button v-for="(item, index) in buttonList" :key="index" :type="item.type || 'primary'" :size="item.size || 'mini'" :icon="item.icon" @click="btnClick(item.func, item)">{{item.label}}</el-button>
      </span>
    </div>
    <div class="p1">
      <el-input class="mb1" size="mini" v-if="inputFilter" :placeholder="$t('message.enterKeyWordsToFilter')"
        clearable v-model="keyword">
        <template slot="append">
          <slot name="inputSlot"></slot>
        </template>
      </el-input>
        <div class="color-warning draggableTips" v-if="draggable">
          <i class="el-icon-info color-warning"></i>&nbsp;
          {{$t('message.draggableTips')}}
        </div>
      <div :style="{'max-height': defaultHeight + 'px', 'overflow-y': 'auto'}">
        <div class="px1">
          <el-tree class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all
            :expand-on-click-node="false" :filter-node-method="filterMethod" ref="tree"
            node-key="id"
            :show-checkbox="options.checkbox || false"
            highlight-current
            :default-checked-keys="checklist"
            @check="check"
            @node-click="handleNodeClick"
            check-strictly
            :draggable="draggable"
            @node-drop="handleDrop">
            <div class="area-tree" slot-scope="{ node, data }">
              <div class="full area-name">
                <span v-if="nameIconRender">
                  <tree-render :render='nameIconRender' :item="data"></tree-render>
                </span>
                <span>{{node.label}}</span>&nbsp;
                <span v-if='nameAfterRender'>
                  <tree-render :render='nameAfterRender' :item="data"></tree-render>
                </span>
              </div>
              <div v-if="render" class="renderDiv action-btn">
                <tree-render v-if="render" :render='render' :item="data"></tree-render>
              </div>
            </div>
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'roleList',
  components: {
    treeRender: {
      functional: true,
      props: {
        item: Object,
        render: Function,
        index: Number
      },
      render: (h, ctx) => {
        const params = ctx.props.item
        const index = ctx.props.index
        return ctx.props.render(h, params, index)
      }
    }
  },
  props: {
    title: { // 标题
      type: String,
      default: () => {
        return ''
      }
    },
    inputFilter: { // 是否支持筛选
      type: Boolean,
      default: () => {
        return true
      }
    },
    options: { // tree 设置项
      type: Object,
      default: () => {
        return {}
      }
    },
    buttonList: { // 自定义按钮
      type: Array,
      default: () => {
        return []
      }
    },
    nameIconRender: { // 名称自定义图标
      type: Function
    },
    nameAfterRender: { // 名称后面自定义内容
      type: Function
    },
    render: { // 每行自定义操作按钮
      type: Function
    },
    draggable: { // 是否可拖拽
      type: Boolean,
      default: () => {
        return false
      }
    },
    checklist: {
      type: Array,
      default: () => []
    },
    defaultHeight: { // 默认高度
      type: Number,
      default: 500
    },
    treeData: { // tree 数据
      type: Array,
      default: () => {
        return []
      }
    },
    defaultProps: {
      type: Object,
      default: () => {
        const data = {
          children: 'children',
          label: 'name',
          disabled: (val, data) => {
            return val.type === 'ROLE_DIR'
          }
        }
        return data
      }
    }
  },
  data() {
    return {
      params: {
      },
      keyword: ''
    }
  },
  methods: {
    /**
       * 按钮点击事件
      */
    btnClick(func, item) {
      this.$emit('btnClick', func, item)
    },
    /**
       * 拖拽事件
      */
    handleDrop(draggingNode, dropNode, dropType) {
      this.$emit('handleDrop', draggingNode, dropNode, dropType)
    },
    /**
       * 筛选
      */
    filterMethod(query, item) {
      return item.name.indexOf(query) > -1
    },
    /**
       * 选择
      */
    check(item, data) {
      this.$emit('check', item, data)
    },
    /**
       * 节点点击
      */
    handleNodeClick(data, node, item) {
      if(item.$el.className === 'el-tree-node is-expanded is-current is-focusable') {
        item.$el.className = 'el-tree-node is-expanded'
      } else {
        item.$el.className = 'el-tree-node is-expanded is-current is-focusable'
      }

      this.$emit('handleNodeClick', data)
    }
  },
  watch: {
    keyword(val) {
      if (this.inputFilter) {
        this.$refs.tree.filter(val)
      }
    },
    checklist: {
      handler(val) {
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.role-list {
  .title{
    font-weight: 550;
  }
  .buttonList{
    padding-bottom: 10px;
  }
  .mb1{
    margin-bottom: 10px;
  }
  .button-item + .button-item{
    margin-left: 10px;
  }
  .action-btn {
    display: none;
    top: 7px;
    right: 10px;
    padding: 0 10px;
  }
  .area-tree {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top:    10px;
    padding-bottom: 10px;
    .area-name{
      height: 100%;
      max-width: 100% !important;
      overflow: hidden;
    }
  }
  .area-tree:hover {
    .action-btn {
      display: inline-block;
    }
  }
  .roleDirColor {
    color: $--color-primary
  }
  .roleColor{
    color: $--color-warning
  }
  .draggableTips{
    padding: 4px 10px;
    background: rgba(128, 109, 82, 0.1);
  }
  .renderDiv{
    position: absolute;
    background: rgb(245, 247, 250);
    right: 0;
    top: 10px;
    z-index: 10;
  }
}

</style>
