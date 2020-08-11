<script>
export default {
  beforeCreate() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.push({ path: '/' + path, query })
  },
  render: function(h) {
    return h()
  }
}
</script>
