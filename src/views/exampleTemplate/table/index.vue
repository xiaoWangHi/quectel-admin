<template>
  <div class="padding10 container">
    <q-form-template :inner-obj='innerObj'
                    height='600px'
                    @add='add'
                    @topBtnClick="topBtnClick">
      <!-- <div slot="header" class="padding10" style="background: #ccc">slot-header</div>
      <div slot="top" style="background: #ccc">slot-top</div>
      <div slot="top-after" style="background: #ccc">top-after</div> -->
    </q-form-template>
  </div>
</template>

<script>
export default {
  name: 'tableView',
  data() {
    return {
      innerObj: { // 表格需要的参数
        add: true,
        pageTitle: '',
        buttonList: [
          { type: 'primary', label: '其他按钮', func: '1' },
          { type: 'primary', label: '其他按钮', func: '1' },
          { type: 'danger', label: '带icon', icon: 'el-icon-grape', func: '2' }
        ],
        formList: [
          {
            formType: 'input',
            bind: 'key',
            type: 'text',
            clearable: true,
            prefixIcon: 'el-icon-search'
          }, {
            formType: 'select',
            bind: 'select',
            options: [{ label: 1, value: 1 }, { label: 2, value: 2 }]
          }, {
            formType: 'date',
            bind: 'date'
          }, {
            formType: 'cascader',
            bind: 'cascader',
            options: [
              { label: 1, value: 1, children: [{ label: 2, value: 2 }] },
              { label: 2, value: 2 }
            ]
          }
        ],
        tableData: {
          options: {
            indexType: 'selection',
            ref: 'userTable',
            page: true,
            editDataHead: true
          },
          dataBody: [{
            id: '1',
            name: '张三',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3556906815,2402486002&fm=26&gp=0.jpg',
            rate: 1,
            switch: 'N'
          }, {
            id: 2,
            name: '123',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3556906815,2402486002&fm=26&gp=0.jpg',
            rate: 2,
            switch: 'Y'
          }, {
            id: 3,
            name: '123',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3556906815,2402486002&fm=26&gp=0.jpg',
            rate: 2,
            switch: 'Y'
          }, {
            id: 4,
            name: '123',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3556906815,2402486002&fm=26&gp=0.jpg',
            rate: 2,
            switch: 'Y'
          }, {
            id: 5,
            name: '123',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3556906815,2402486002&fm=26&gp=0.jpg',
            rate: 2,
            switch: 'Y'
          }, {
            id: 6,
            name: '123',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3556906815,2402486002&fm=26&gp=0.jpg',
            rate: 2,
            switch: 'Y'
          }, {
            id: 7,
            name: '123',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3556906815,2402486002&fm=26&gp=0.jpg',
            rate: 2,
            switch: 'Y'
          }],
          dataHead: [
            { prop: 'name', label: this.$t('message.name') },
            { prop: 'img', label: this.$t('message.name'), img: true },
            { prop: 'name', label: this.$t('message.name'), input: true },
            { prop: 'name', label: this.$t('message.name'), select: true, width: 190, options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ] },
            { prop: 'name', label: this.$t('message.name'), tag: true },
            { prop: 'rate', label: this.$t('message.name'), rate: true, width: 100 },
            { prop: 'name', label: this.$t('message.name'), link: true },
            { prop: 'name', label: '双击事件' },
            { prop: 'name', label: this.$t('message.name'), sortable: 'custom' },
            { prop: 'switch', label: this.$t('message.name'), switch: true, activeValue: 'Y', inactiveValue: 'N' },
            { label: '嵌套表头', columns: [
              { prop: 'name', label: this.$t('message.name') },
              { prop: 'name', label: this.$t('message.name') }
            ] },
            {
              prop: 'createTime',
              label: this.$t('message.operate'),
              align: 'left',
              width: 160,
              render: (h, params, index) => {
                if(index % 2 === 0) {
                  return (
                    <div>
                      <el-button type='primary' size='mini'>{this.$t('message.edit')}</el-button>
                    </div>
                  )
                } else {
                  return (
                    <div>
                      <el-button type='danger' size='mini'>{this.$t('message.delete')}</el-button>
                      <el-button size='mini'>{this.$t('message.info')}</el-button>
                    </div>
                  )
                }
              }
            }
          ]
        },
        originalWatch: {
          pageNumber: 1,
          pageSize: 10,
          key: '',
          select: '',
          date: '',
          orderBy: '',
          orderDirection: '',
          workStatus: 'IN_SERVICE'
        },
        totalCount: 0
      }
    }
  },
  methods: {
    init() {},
    add() {
      this.$message.success('您点击了新增按钮')
    },
    /**
     * 其他按钮点击
    */
    topBtnClick(func, item) {
      switch(func) {
        case '1':
          this.$message.success(`您点击了按钮【${item.label}】`)
          break
        case '2':
          this.$message.success(`您点击了按钮【${item.label}】`)
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  // background: red;
  flex: 1;
}
</style>
