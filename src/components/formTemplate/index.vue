<template>
  <div class="form-template-view">
    <slot name="header"></slot>
    <div class="search-header clear">
      <div class="left">
        <el-button v-if="innerObj.add"
                   type="primary"
                   size="mini"
                   icon="el-icon-plus"
                   @click="add">{{$t('message.add') + innerObj.pageTitle}}</el-button>
      <div v-else-if="innerObj.pageTitle" class="pageTitle">
        <i class="iconfont iconshuxian color-primary"></i>
        <span>{{innerObj.pageTitle}}</span>
      </div>
      <span v-for="(item, index) in innerObj.buttonList" :key="index">
        <el-button :type="item.type || 'primary'" :size="item.size || 'mini'" :icon="item.icon" @click="topBtnClick(item.func, item)">{{item.label}}</el-button>
      </span>
      </div>
      <div class="right">
        <slot name="top"></slot>
        <div v-for="(item, index) in formList"
             :key="index">
          <!--
          输入框
          bind: 绑定值   --必填
          formType：input  --必填
          尺寸： size
          类型：type
          输入框头部图标 prefixIcon
          输入框尾部图标 suffixIcon
        -->
          <div v-if="item.formType === 'input'">
            <el-input v-model="originalWatch[item.bind]"
                      :size="item.size || 'mini'"
                      :type="item.type || 'text'"
                      :prefix-icon="item.prefixIcon"
                      :suffix-icon="item.suffixIcon"
                      :clearable="item.clearable"
                      @clear="clear"
                      :placeholder="item.placeholder || $t('message.pleaseEnter')"
                      @keyup.enter.native="searchData">
            </el-input>
          </div>
          <!-- 下拉框树，筛选带有层级结构的数据
              tree: {
                inputVal: 'deptId', 字段绑定值value
                trees: [],
                defaultProps: {
                  children: 'children',
                  label: 'name'
                }
              }
              treeForm: 原始参数
          -->
          <div v-if="item.formType === 'inputTree'">
            <input-tree :option="item.options"
                        :treeForm="originalWatch[item.bind]"
                        :placeholder="item.placeholder || $t('message.pleaseChoose')"
                        :clearable="item.clearable"
                        @change="searchData">
            </input-tree>
          </div>
          <!--
          输入框
          bind: 绑定值   --必填
          formType：date --必填
          显示类型： type  // 可选 year/month/date/week/ datetime/datetimerange/daterange
          范围选择时开始日期的占位内容 startPlaceholder
          范围选择时结束日期的占位内容 endPlaceholder
          是否使用箭头进行时间选择  timeArrowControl
          显示在输入框中的格式  format  // yyyy-MM-dd HH:mm:ss
          绑定值的格式。 valueFormat
          是否显示清除按钮  clearable
          禁用  disabled
          只读  readonly
        -->
          <div v-if="item.formType === 'date'">
            <el-date-picker
              v-model="originalWatch[item.bind]"
              :size="item.size || 'mini'"
              :type="item.type || 'datetimerange'"
              :picker-options="item.pickerOptions || {}"
              :time-arrow-control="item.timeArrowControl || false"
              :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
              :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
              :clearable="item.clearable || true"
              :disabled="item.disabled || false"
              :readonly="item.readonly || false"
              range-separator="-"
              :start-placeholder="item.startPlaceholder || $t('message.StartDate')"
              :end-placeholder="item.endPlaceholder || $t('message.EndDate')">
            </el-date-picker>
          </div>
          <!--
          选择框
          -------------必填--------
          formType：select
          bind: 绑定值
          options: 数据源

          ------------可选----------
          尺寸： size
          多选 multiple
          多选时最多限制 multipleLimit  0不限制
          筛选 filterable
          清空 clearable
        -->
          <div v-if="item.formType === 'select'">
            <el-select v-model="originalWatch[item.bind]"
                       :size="item.size || 'mini'"
                       :placeholder="item.placeholder || $t('message.pleaseChoose')"
                       :multiple="item.multiple || false"
                       :filterable="item.filterable || false"
                       :clearable="item.clearable || false"
                       :multiple-limit="item.multipleLimit || 0">
              <el-option v-for="item in item.options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!--
            级联选择器
            -------------必填--------
            formType：cascader --必填
            bind: 绑定值   --必填
            options: 数据源  --必填

            ------------可选----------
            尺寸： size
            多选 multiple
            清空 clearable
            是否显示选中值的完整路径 showAllLevels
            是否严格的遵守父子节点不互相关联 checkStrictly
            emitPath 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
          -->
          <div v-if="item.formType === 'cascader'">
            <el-cascader v-model="originalWatch[item.bind]"
                         :size="item.size || 'mini'"
                         :options="item.options"
                         :clearable="item.clearable || false"
                         :show-all-levels="item.showAllLevels || false"
                         :placeholder="item.placeholder || $t('message.pleaseEnter')"
                         :props="{
                        expandTrigger: item.expandTrigger || 'click',
                        multiple: item.multiple || false,
                        checkStrictly: item.checkStrictly || false,
                        emitPath: item.emitPath || false,
                        value: item.valueKey || 'value',
                        label: item.labelKey || 'label'
                      }">
            </el-cascader>
          </div>
        </div>
        <div v-if="formList && formList.length">
          <el-button type="primary"
                     size="mini"
                     @click="searchData">{{$t('message.search')}}</el-button>
        </div>
        <!-- 显示隐藏表格列 -->
        <el-popover
          v-if="innerObj.tableData.options.editDataHead"
          placement="bottom"
          trigger="click">
          <div class="selfDefine">
            <div class="selfDefineItem" v-for="(item, index) in innerObj.tableData.dataHead" :key="index">
              <el-checkbox :checked="!item.hidden" @change="(val)=>{return checkboxClick(index,val)}">{{item.label}}</el-checkbox>
            </div>
          </div>
          <el-button slot="reference" size="mini">{{$t('message.selfDefine')}}</el-button>
        </el-popover>
      </div>
    </div>
    <slot name="top-after"></slot>
    <div class="search-content"
         :style="{height: height || '680px'}">
      <!--
        表格封装
        innerObj.tableData  表格数据
        -----------------必填--------------
        dataBody：数据源
        -----------------可选--------------
        option： 表格设置
       -->
      <el-table v-if="innerObj.tableData"
                :ref="innerObj.tableData.options.ref || 'table'"
                v-loading="loading"
                element-loading-text="数据正在加载中"
                :header-cell-style="headerStyle || {}"
                :data="innerObj.tableData.dataBody"
                :border="innerObj.tableData.options.border || true"
                :stripe="innerObj.tableData.options.stripe || true"
                :height="innerObj.tableData.options.height || '100'"
                :max-height="innerObj.tableData.options.maxHeight"
                :width="innerObj.tableData.options.width"
                :emptyText="innerObj.tableData.options.emptyText || '暂无数据'"
                :default-sort="innerObj.tableData.options.defaultSort"
                highlight-current-row
                :row-key="innerObj.tableData.options.rowKey || 'id'"
                :tree-props="innerObj.tableData.options.treeProps"
                @selection-change="handleSelectionChange"
                @sort-change="sortChange"
                @header-dragend="headerDragend"
                :default-expand-all="innerObj.tableData.options.expandAll || false"
                @cell-dblclick='dblclick'>
        <!--
          列循环
         -->
        <!-- 列样式调整 -->
        <!-- <el-table-column width="1" fixed="left" style="opacity: 0;"></el-table-column> -->
        <!-- 序号列 -->
        <el-table-column v-if="innerObj.tableData.options.indexType"
                         :type="innerObj.tableData.options.indexType || 'index'"
                         :label="innerObj.tableData.options.indexLabel || '序号'"
                         :align="innerObj.tableData.options.indexAlign || 'left'"
                         :reserve-selection="innerObj.tableData.options && innerObj.tableData.options.indexType === 'selection' ? true : false"
                         fixed="left">
        </el-table-column>
        <template v-for="(v, index) in innerObj.tableData.dataHead">
          <!-- 自定义表头 -->
          <el-table-column v-if="v.header && !v.hidden"
                           :label="v.label"
                           :width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'left'" :key="index">
            <template slot="header">
              {{v.label}}
              <el-tooltip class="item"
                          v-if="v.tooltip"
                          effect="dark"
                          :content="v.tooltip"
                          placement="top">
                <i class="el-icon-question icon-primary"></i>
              </el-tooltip>
            </template>
          </el-table-column>

          <!-- 操作按钮列 -->
          <el-table-column v-else-if="v.render && !v.hidden"
                           :label="v.label"
                           :width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'left'"
                            :key="index">
            <template slot-scope="scope">
              <render-button slot="reference"
                             :item="v"
                             :row="scope.row"
                             :render="v.render"
                             :index="scope.$index">
              </render-button>
            </template>
          </el-table-column>

          <!-- 图片 -->
          <el-table-column v-else-if="v.img && !v.hidden"
                           :label="v.label"
                           :width="v.width || 120"
                           :fixed="v.fixed"
                           :align="v.align || 'left'" :key="index">
            <template slot-scope="scope"
                      v-if="v.img">
              <el-tooltip effect="dark" :content="$t('message.view') + $t('message.picture')" placement="top">
                <div class="imgBox" v-picture='scope.row[v.prop]'>
                  <img class="img"
                      :src="scope.row[v.prop]">
                </div>
              </el-tooltip>
            </template>
          </el-table-column>

          <!-- 嵌套表头 动态修改表格列显示与嵌套表头 慎同时使用 -->
          <el-table-column v-else-if="v.columns && !v.hidden"
                           :label="v.label"
                           :width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'center'"
                           :show-overflow-tooltip="v.showOverflowTooltip || true" :key="index">
            <template>
              <div v-for="(col, index) in v.columns"
                   :key="index">
                <el-table-column :label="col.label"
                                 :prop="col.prop"
                                 :align="col.align || 'left'"
                                 :show-overflow-tooltip="v.showOverflowTooltip || true"></el-table-column>
              </div>
            </template>
          </el-table-column>

          <!-- 文字链接 -->
          <el-table-column v-else-if="v.link && !v.hidden"
                           :label="v.label"
                           :width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'left'" :key="index">
            <template slot-scope="scope">
              <el-link :type="v.linkType || 'primary'"
                       @click="linkClick(scope.row, v.prop, scope.$index)">{{scope.row[v.prop] | noString}}</el-link>
            </template>
          </el-table-column>

          <!--
            tag标签
            size: 大小
          -->
          <el-table-column v-else-if="v.tag && !v.hidden"
                           :label="v.label"
                           :width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'left'" :key="index">
            <template slot-scope="scope">
              <el-tag type="success"
                      :size="v.size || 'mini'" :effect="v.effect || 'light'" :hit="v.hit || false">{{scope.row[v.prop] | noString}}</el-tag>
            </template>
          </el-table-column>

          <!--
            Switch 开关
          -->
          <el-table-column v-else-if="v.switch && !v.hidden"
                           :label="v.label"
                           :width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'left'" :key="index">
            <template slot-scope="scope">
              <el-switch v-model="scope.row[v.prop]"
                         :active-color="v.activeColor"
                         :inactive-color="v.inactiveColor"
                         :active-text="v.activeText"
                         :inactive-text="v.inactiveText"
                         :active-value="v.activeValue"
                         :inactive-value="v.inactiveValue"
                         @change="switchChange(scope.row, v.prop, scope.$index)">
              </el-switch>
            </template>
          </el-table-column>

          <!--
            Rate 评分组件
            disabled	是否为只读
            allowHalf	是否允许半选
            colors icon颜色
            showText 是否显示文字
           -->
          <el-table-column v-else-if="v.rate && !v.hidden"
                           :label="v.label"
                           :width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'left'" :key="index">
            <template slot-scope="scope">
              <el-rate v-model="scope.row[v.prop]"
                       :colors="v.colors"
                       :show-text="v.showText || false"
                       :disabled="scope.row.disabled || false"
                       :allow-half="v.allowHalf || false"></el-rate>
            </template>
          </el-table-column>

          <!-- input 输入框 -->
          <el-table-column v-else-if="v.input && !v.hidden"
                           :label="v.label"
                           :width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'left'" :key="index">
            <template slot-scope="scope">
              <el-input v-model="scope.row[v.prop]"
                        :size="v.size || 'mini'"
                        :type="v.inputType || 'text'"
                        :prefix-icon="v.prefixIcon"
                        :suffix-icon="v.suffixIcon"
                        :clearable="v.clearable"
                        :placeholder="v.placeholder || $t('message.pleaseEnter')"></el-input>
            </template>
          </el-table-column>

          <!-- select 选择框 -->
          <el-table-column v-else-if="v.select && !v.hidden"
                           :label="v.label"
                           :width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'left'" :key="index">
            <template slot-scope="scope">
              <el-select v-model="scope.row[v.prop]"
                         :size="v.size || 'mini'"
                         :placeholder="v.placeholder || $t('message.pleaseEnter')"
                         :multiple="v.multiple || false"
                         :filterable="v.filterable || false"
                         :clearable="v.clearable || false"
                         :multiple-limit="v.multipleLimit || 0">
                <el-option v-for="item in v.options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <!-- 其他 -->
          <el-table-column v-else-if="!v.hidden"
                           :prop="v.prop"
                           :label="v.label"
                           :min-width="v.width"
                           :fixed="v.fixed"
                           :align="v.align || 'left'"
                           :sortable="v.sortable || false" :key="index"
                           :resizable="v.resizable || true"
                           :show-overflow-tooltip="v.showOverflowTooltip || true">
            <template slot-scope="scope">
              <el-popover
                placement="left"
                trigger="hover"
                :content="$t('message.click')+$t('message.edit')"
                :disabled="!v.edit">
                <span slot="reference" :class="v.edit ? 'ellipsisLink' : ''">{{scope.row[v.prop] | noString}}</span>
              </el-popover>
            </template>
          </el-table-column>

        </template>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-view"
         v-if="innerObj.tableData.options.page">
      <el-pagination :page-sizes="[10,20, 50, 100, 200, 300, 500]"
                     :page-size="originalWatch.pageSize"
                     @current-change="currentChange"
                     layout="total, prev, pager, next, sizes"
                     :total="innerObj.totalCount"
                     :current-page="originalWatch.pageNumber"
                     @size-change="handleSizeChange"
                     background></el-pagination>
    </div>
    <slot name="dialogs"></slot>
  </div>
</template>

<script>
import ellipsisView from '../ellipsisView'
import { InputTree } from 'components'
export default {
  props: {
    innerObj: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    height: {
      type: String,
      default: () => {
        return '680px'
      }
    }
  },
  data() {
    return {
      dataBodyObj: {},
      headerStyle: { // 表头样式
        // background: '#edf0f3 !important',
        // 'border-left': '1px solid red',
        // color: '#333333'
      },
      loading: false,
      originalWatch: this.innerObj.originalWatch // 需被检测刷新数据
    }
  },
  methods: {
    /**
     * 拖动表头
    */
    headerDragend(newWidth, oldWidth, column, event) {
      if (this.$refs.ellipsisView && this.$refs.ellipsisView.length) {
        this.$nextTick(() => {
          for (let i = 0; i < this.$refs.ellipsisView.length; i++) {
            if (this.$refs.ellipsisView[i]._props.index === column.property) {
              this.$refs.ellipsisView[i].parentWidth = newWidth - 30
            }
          }
        })
      }
    },
    /**
     * 双击事件
    */
    dblclick(row, column, cell, event) {
      this.$emit('dblclick', row, column, cell, event)
      if(row[column.property]) {
        this.$message.success(`您双击了【${row[column.property]}】`)
      }
    },
    /**
     * 清空搜索框值
    */
    clear(val) {
      this.$emit('searchData')
    },
    /**
     * 自定义表头点击
    */
    checkboxClick(index, val) {
      this.$set(this.innerObj.tableData.dataHead[index], 'hidden', !val)
    },
    /**
     * 头部按钮点击
    */
    topBtnClick(func, item) {
      this.$emit('topBtnClick', func, item)
    },
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },
    /**
     *  用于多选表格，清空所选项
    */
    clearSelection() {
      this.$refs[this.innerObj.tableData.options.ref || 'table'].clearSelection()
    },
    /**
     *  用于多选表格，切换某一行的选中状态，
    */
    toggleRowSelection(arr) {
      const tableData = this.innerObj.tableData
      arr.forEach(element => {
        if (this.dataBodyObj[element[tableData.options.rowKey || 'id']]) {
          this.$refs[this.innerObj.tableData.options.ref || 'table'].toggleRowSelection(this.dataBodyObj[element[tableData.options.rowKey || 'id']])
        }
      })
    },
    /**
     * 重新布局
     */
    doLayout() {
      setTimeout(() => {
        this.$refs.table.doLayout()
      }, 200)
    },
    /**
      * 切换每页条数
      */
    handleSizeChange(val) {
      this.originalWatch.pageSize = val
      this.$emit('searchData')
    },
    /**
     *  分页
    */
    currentChange(val) {
      this.originalWatch.pageNumber = val
      this.$emit('searchData')
    },
    /**
      * 搜索
      */
    searchData() {
      this.originalWatch.pageNumber = 1
      this.$emit('searchData')
    },
    /**
     * 新增
    */
    add() {
      this.$emit('add')
    },
    /**
     * 表格排序事件
    */
    sortChange(column) {
      const sort = column.order.replace(/ending/g, '')
      // this.originalWatch.orderBy = column.prop
      // this.originalWatch.orderDirection = sort
      this.$set(this.originalWatch, 'orderBy', column.prop)
      this.$set(this.originalWatch, 'orderDirection', sort)
      this.originalWatch.pageNumber = 1
      this.$emit('searchData')
    },
    /**
     * switch change
    */
    switchChange(row, prop, index) {
      this.$emit('switchChange', row, prop, index)
    },
    /**
     * 文字链接点击
     */
    linkClick(row, prop, index) {
      this.$emit('linkClick', row, prop, index)
    },
    //  表格头部 必填样式
    renderH(h, data) {
      return h('span', [
        h(
          'span',
          {
            class: 'is-required',
            style: {
              color: '#FF4D4F'
            }
          },
          '* '
        ),
        h('span', data.column.label)
      ])
    },
    //   表格头部 非必填样式
    renderNo(h, data) {
      return h('span', [h('span', data.column.label)])
    }
  },
  components: {
    InputTree,
    renderButton: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        item: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = ctx.props.row
        const index = ctx.props.index
        return ctx.props.render(h, params, index)
      }
    },
    ellipsisView
  },
  watch: {
    'innerObj.tableData.dataBody': {
      deep: true,
      immediate: true,
      handler(val) {
        const tableData = this.innerObj.tableData
        const _that = this
        if (tableData.options && tableData.options.indexType && tableData.options.indexType === 'selection') {
          tableData.dataBody.forEach(item => {
            _that.dataBodyObj[item[tableData.options.rowKey || 'id']] = item
          })
        }
      }
    }
    // 'innerObj.tableData.dataHead': {
    //   deep: true,
    //   immediate: true,
    //   handler(val) {
    //     this.columnList = val.filter(item => {
    //       return !item.hidden
    //     })
    //     console.log('this.columnList', val, this.columnList)
    //   }
    // }
  },
  computed: {
    formList() {
      const obj = this.innerObj
      if (obj.formList && obj.formList.length) {
        const arr = obj.formList.filter(item => {
          return !item.hidden
        })
        return arr
      } else {
        return []
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.ellipsisLink:hover{
 border-bottom: 1px solid $--color-primary;
 color: $--color-primary;
 transition: all 0.5s;
 cursor: pointer;
}
.form-template-view {
  background: $--color-white;
  padding: 10px;
  @include flex-column;
  .el-select {
    width: 160px;
  }
  .search-header {
    @include flex-nowrap;
    .pageTitle{
      @include fj(center);
      padding-top: 6px;
      span{
        font-size: 14px;
        font-weight: 550;
      }
    }
    .left {
      flex: 1;
      > * {
        margin: 0 0 10px 10px;
        float: left;
      }
      min-width: 200px;
    }
    .right {
      flex: 2;
      @include flex-wrap;
      justify-content: flex-end;
      flex-direction: row;
      .el-input {
        width: 160px;
      }
      .el-cascader {
        width: 160px;
      }
      > * {
        margin: 0 10px 10px 0;
        // float: left;
      }
    }
  }

  .search-content {
    flex: 1;
    height: 680px; // 必须设，随意传值，但一定不能是百分比，否则在IE上会出现无限加载的BUG
    // overflow-y: auto;
    .el-table {
      height: 100% !important;
      .inline-block {
        float: left;
        p {
          margin: 0;
          padding: 0;
          img {
            width: 60px;
            height: 60px;
            display: block;
          }
          span {
            line-height: 28px;
            margin-right: 10px;
          }
        }
        .el-button {
          margin-right: 10px;
        }
        &:last-child {
          .el-button {
            margin-right: 0;
          }
        }
      }
      .popover-span {
        width: 150px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        @include ellipsis;
      }
    }
    .imgBox {
      @include fj;
      justify-content: center;
      align-items: center;
      width: 46px;
      height: 46px;
      overflow: hidden;
      padding: 4px;
      border-radius: 6px;
      background: $--color-bg;
      cursor: pointer;
      img {
        width: auto;
        height: auto;
        max-width: 40px;
        max-height: 40px;
      }
    }
  }
  .pagination-view {
    padding: 20px 0;
    text-align: right;
  }
}

.selfDefine{
  width: auto;
  min-width: 100px;
  height: auto;
  max-height: 200px;
  overflow-y: auto;
  text-align: left;
  .selfDefineItem{
    padding: 4px 6px;
  }
}
</style>
