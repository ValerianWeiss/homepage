<template>
  <div class="portfolio">
    <div
      v-for="artwork in this.artworks"
      :key="artwork.title">
      <protfolio-item class="image" :artwork="artwork"></protfolio-item>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProtfolioItem from '@/components/PortfolioItem.vue'
import artworks from '@/misc/artworks'
import Artwork from '@/misc/Artwork'

@Component({
  name: 'protfolio',
  components: { ProtfolioItem }
})
export default class Portfolio extends Vue {
  private artworks: Artwork[]

  constructor() {
    super()
    this.artworks = artworks
  }
}
</script>

<style lang="sass" scoped>
.image
  width: 33.33%
  height: auto
</style>
