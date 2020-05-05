<template>
  <div class="portfolio">
    <protfolio-item
      class="item"
      :artwork="activeArtwork">
    </protfolio-item>
    <item-selector
      :activeItem="this.activeArtwork"
      :items="this.artworks"
      :displayItemCount="5"
      v-on:updateActiveItem="onUpdateActiveItem">
    </item-selector>
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
  private activeArtwork: Artwork

  public constructor() {
    super()
    this.artworks = this.sortArtworksForSelector(artworks)
    this.activeArtwork = artworks[0]
  }

  private sortArtworksForSelector(artworks: Artwork[]): Artwork[] {
    let middleIndex = Math.floor(artworks.length / 2) + 1
    let suffix = artworks.slice(middleIndex)
    let prefix = artworks.slice(0, middleIndex)
    return suffix.concat(prefix)
  }

  public onUpdateActiveItem(artwork: Artwork): void {
    this.activeArtwork = artwork
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
