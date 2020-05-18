<template>
  <div class="home">
    <navbar class="navbar"></navbar>
    <portfolio class="portfolio"></portfolio>
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
  display: grid
  grid-template-rows: [line-start] 60px [line1] calc( 100vh - 60px ) [line-end]

.navbar
  grid-column-start: 1
  grid-column-end: 1
  grid-row-start: 1
  grid-row-end: 1

.portfolio
  grid-column-start: 1
  grid-column-end: 1
  grid-row-start: 2
  grid-row-end: 2
</style>
