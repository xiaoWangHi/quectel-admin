<template>
  <div class="padding10 tree-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <q-tree-list :nameIcon="formData.nameIcon"
                   :title="formData.title"
                   :showCheckbox="formData.showCheckbox"
                   :inputFilter="formData.inputFilter"
                   :buttonList="formData.otherBtn ? buttonList : []"
                   :nameIconRender="formData.nameIcon ? nameIconRender : null"
                   :nameAfterRender="formData.nameAfter ? nameAfter : null"
                   :options='options'
                   :treeData="treeData"
                   :render="formData.editBtn ? render : null"
                   :draggable="formData.draggable"
                   :defaultProps="{  children: 'children',label: 'name'}"
                   @btnClick="btnAllClick"
                   @handleDrop="handleDrop"
                   @check='check'
                   @handleNodeClick='handleNodeClick'></q-tree-list>
      </el-col>
      <el-col :span="12" class="padding10">
        <el-form :model="formData" class="padding10" label-width="200px" size='mini'>
          <el-form-item label="标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="是否显示新增按钮">
            <el-row>
              <el-col :span="6"><el-switch v-model="options.add"></el-switch></el-col>
              <el-col :span="18"><el-input :disabled="!options.add" v-model="options.addTitle"></el-input></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="是否显示自定义按钮">
            <el-switch v-model="formData.otherBtn"></el-switch>
          </el-form-item>
          <el-form-item label="是否支持筛选">
            <el-switch v-model="formData.inputFilter"></el-switch>
          </el-form-item>
          <el-form-item label="是否支持排序">
            <el-switch v-model="formData.draggable"></el-switch>
          </el-form-item>
          <el-form-item label="是否显示多选框">
            <el-switch v-model="options.checkbox"></el-switch>
          </el-form-item>
          <el-form-item label="是否显示名称图标">
            <el-switch v-model="formData.nameIcon"></el-switch>
          </el-form-item>
          <el-form-item label='是否显示名称后面自定义内容'>
            <el-switch v-model="formData.nameAfter"></el-switch>
          </el-form-item>
          <el-form-item label="是否显示自定义操作按钮">
            <el-switch v-model="formData.editBtn"></el-switch>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TREE_JSON from './tree.json'
export default {
  data() {
    return {
      formData: {
        title: '',
        inputFilter: true,
        draggable: true,
        nameIcon: true,
        nameAfter: true,
        otherBtn: true,
        editBtn: true
      },
      treeData: TREE_JSON,
      treeButton: [
        { content: this.$t('message.add'), icon: 'el-icon-plus color-primary pointer mr1', func: 'add' },
        { content: this.$t('message.edit'), icon: 'el-icon-edit-outline color-primary pointer mr1', func: 'edit' },
        { content: this.$t('message.delete'), icon: 'el-icon-delete color-warning pointer mr1', func: 'delete' }
      ],
      buttonList: [
        { type: 'success', label: '自定义-icon', func: 'icon', icon: 'el-icon-delete' },
        { type: 'danger', label: '自定义', func: 'other' }
      ],
      nameAfter: (h, params) => {
        if (params.children && params.children.length) {
          return (
            <el-tag type='success' class='treeTag' size='mini'>自定义内容</el-tag>
          )
        }
      },
      nameIconRender: (h, params) => {
        if (params.children && params.children.length) {
          return (
            <i class='iconfont el-icon-s-goods color-primary'></i>
          )
        } else {
          return (
            <i class='iconfont el-icon-s-management color-warning'></i>
          )
        }
      },
      render: (h, params) => {
        const array = []
        this.treeButton.forEach(el => {
          let flag = true
          if (el.func === 'delete' && params.children && params.children.length) { // 有子集不显示删除icon
            flag = false
          }
          if (flag) {
            array.push(
              h(
                'el-tooltip',
                {
                  props: {
                    effect: 'dark',
                    placement: 'top',
                    content: el.content
                  }
                },
                [
                  h('i', { class: el.icon, on: {
                    click: e => {
                      e.stopPropagation()
                      this.btnAllClick(el.func, params)
                    }
                  }})
                ]
              )
            )
          }
        })
        return h('div', array)
      },
      options: {
        add: true,
        addTitle: this.$t('message.name'),
        checkbox: false
      }
    }
  },
  created() {
    // this.getTreeList()
  },
  methods: {
    /**
     *  点击事件
     **/
    btnAllClick(func, params) {
      switch (func) {
        case 'add':
          this.$message.success('点击新增')
          break
        case 'edit':
          this.$message.success('点击编辑')
          break
        case 'delete':
          this.$message.error('点击删除')
          break
        case 'icon':
          this.$message.warning('点击自定义icon')
          break
        case 'other':
          this.$message.warning('点击自定义按钮')
          break
      }
    },
    // 拖拽事件
    handleDrop() {
      this.$message.warning('拖拽事件')
    },
    // 选择事件
    check(item, data) {
      console.log(item, data)
      this.$message.success(`【${item.name}】, 【${data.checkedKeys}】`)
    },
    // 列点击
    handleNodeClick(item) {
      this.$message.success(`您点击了【${item.name}】`)
    }
  }
}
</script>

<style lang='scss' scoped>
.tree-container{
  height: 100%;
  .treeTag{
    margin-left: 4px;
  }
}
</style>
