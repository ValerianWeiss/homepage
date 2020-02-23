<template>
  <div class="home">
    <loading v-if="this.isLoading"></loading>
    <div class="content center-flex">
      <portfolio class="width-height-100"></portfolio>
    </div>
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
  margin: 0
  padding: 0 10% 0 10%
</style>
