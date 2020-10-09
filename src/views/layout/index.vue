<template>
  <div>
    <transition v-if="mode === 'vertical'" name="fade-transform" mode="out-in">
      <vertical></vertical>
    </transition>
    <transition v-if="mode === 'horizontal'" name="fade-transform" mode="out-in">
      <horizontal></horizontal>
    </transition>
  </div>
</template>
<script>
import { Vertical, Horizontal } from './mode'
import { mapGetters } from 'vuex'
export default {
  components: {
    Vertical, Horizontal
  },
  computed: {
    ...mapGetters(['mode'])
  },
  created() {
    console.log('vertical', this)
  }
}
</script>

