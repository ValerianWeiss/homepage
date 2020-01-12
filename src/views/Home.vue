<template>
  <div class="home">
    <loading v-if="this.isLoading()"></loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Loading from '@/views/Loading.vue'
import '@/main.sass'

@Component({
  name: 'home',
  components: { Loading }
})
export default class Home extends Vue {
  isLoading() {
    return true
  }
}
</script>

<style lang="sass" scoped>
.home
  margin: 0
  padding: 0
</style>
