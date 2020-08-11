<template>
  <section class="todoapp">
    <!-- header -->
    <div class="header">
      <div class="h3 titleColor">{{title}}</div>
      <div class="fj font12 contentColor pointer">更多&nbsp;&nbsp;<i class="el-icon-arrow-right"></i> </div>
    </div>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          :type='btnType'
        />
      </ul>
    </section>
  </section>
</template>

<script>
import Todo from './Todo.vue'

export default {
  components: { Todo },
  props: {
    title: {
      type: String,
      default: () => {
        return '列表'
      }
    },
    btnType: {
      type: String,
      default: () => {
        return 'btn'
      }
    }
  },
  data() {
    const defalutList = [
      { text: 'star this repositorystar this  repositor ', btn: this.$t('message.edit'), type: 'primary' },
      { text: 'fork this repository', btn: this.$t('message.delete'), type: 'danger' },
      { text: 'vue-element-admin', btn: this.$t('message.view'), type: 'primary' },
      { text: 'vue', btn: this.$t('message.edit'), type: 'primary' },
      { text: 'element-ui', btn: this.$t('message.view'), type: 'primary' },
      { text: 'follow author', btn: this.$t('message.delete'), type: 'danger' },
      { text: 'axios', btn: this.$t('message.edit'), type: 'primary' }
    ]
    return {
      visibility: 'all',
      todos: defalutList
    }
  },
  computed: {
    filteredTodos() {
      return this.todos
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
