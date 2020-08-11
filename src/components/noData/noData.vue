<template>
  <div>
    <div class="center">
      <img v-if="showImg" :src="nodata">
      <div class="mt5 h18 color-subTitle">{{$t('message.noData')}}~~</div>
    </div>
  </div>
</template>
<script>
import nodata from '@/assets/img/nodata.png'
export default {
  name: 'noData',
  components: {},
  props: {
    showImg: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      nodata
    }
  },
  computed: {
  },
  methods: {},
  mounted() {
  },
  watch: {
  }
}
</script>

<style lang="scss">
</style>
