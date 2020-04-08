<template>
  <div class="home">
    <loading v-if="this.isLoading"></loading>
    <portfolio></portfolio>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Loading from '@/views/Loading.vue'
import Portfolio from '@/components/Portfolio.vue'
import Navbar from '@/components/Navbar.vue'
import '@/main.sass'

@Component({
  name: 'home',
  components: { Loading, Portfolio, Navbar }
})
export default class Home extends Vue {
  private get isLoading(): boolean {
    return false
  }
}
</script>

<style lang="sass" scoped>
.home
  height: calc(100vh - 60px)
  margin: 0
  padding: 0 10% 0 10%
</style>
