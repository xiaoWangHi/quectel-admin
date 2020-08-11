<template>
  <li class="todo edit">
    <div class="view fj-start">
      <i class="iconfont icondian" :style="{color: color()}"></i>
      <div class="content">{{todo.text}}</div>
      <div class="operat">
          <el-button size="mini" v-if="type === 'btn'" :type="todo.type || 'primary'">{{todo.btn}}</el-button>
          <el-link v-else-if="type === 'link'" :type="todo.type || 'primary'">{{todo.btn}}</el-link>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    todo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: () => {
        return 'btn'
      }
    }
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    color() {
      const colors = ['#7fdbda', '#ade498', '#24a19c', '#e8505b', '#086972', '#f37121']
      return colors[Math.floor(Math.random() * colors.length)]
    }
  }
}
</script>
