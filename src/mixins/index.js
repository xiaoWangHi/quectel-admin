
import v from 'utils/validate'
import Lang from 'utils/Lang'
const mixin = {
  data() {
    return {}
  },
  methods: {
    // 校验
    check(rules) {
      for (const rule of rules) {
        const value = rule.value
        if (rule.method !== 'noDuplicate' && Lang.isArray(value)) {
          // 数组校验每个值
          for (const innerValue of value) {
            const isValid = this.execCheck(rule, innerValue)
            if (!isValid) {
              return false
            }
          }
        } else {
          // 单元素直接校验
          const isValid = this.execCheck(rule, value)
          if (!isValid) {
            return false
          }
        }
      }
      return true
    },
    execCheck(rule, value) {
      const method = v[rule.method].bind(v)
      const isValid = method(value, rule.param)
      if (!isValid) {
        if (rule.message) {
          this.$message.error(rule.message)
        }
        return false
      }
      return true
    }
  }
}
export default mixin
