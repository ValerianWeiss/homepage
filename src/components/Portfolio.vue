<template>
  <div class="portfolio">
    <div
      class="item"
      v-for="artwork in this.artworks"
      :key="artwork.title">
      <protfolio-item :artwork="artwork"></protfolio-item>
    </div>
    <item-selector></item-selector>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProtfolioItem from '@/components/PortfolioItem.vue'
import ItemSelector from '@/components/ItemSelector.vue'
import artworks from '@/misc/artworks'
import Artwork from '@/misc/Artwork'

@Component({
  name: 'protfolio',
  components: { ProtfolioItem, ItemSelector }
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
.portfolio
  height: 100%

.item
  width: 100%
  height: 80%
</style>
