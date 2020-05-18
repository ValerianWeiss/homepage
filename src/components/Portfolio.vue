<template>
  <div class="portfolio">
    <protfolio-item
      :artwork="this.activeArtwork"
      :fadeInOutDuration="500">
    </protfolio-item>
    <item-selector
      class="item-selector"
      :activeItem="this.activeArtwork"
      :items="this.artworks"
      :displayItemCount="5"
      :animationDuration="500"
      :imageWrapperSize="100"
      :orientation="this.orientation"
      v-on:updateActiveItem="this.onUpdateActiveItem">
    </item-selector>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProtfolioItem from '@/components/PortfolioItem.vue'
import ItemSelector, { Orientation } from '@/components/ItemSelector.vue'
import artworks from '@/misc/artworks'
import Artwork from '@/misc/Artwork'

@Component({
  name: 'portfolio',
  components: { ProtfolioItem, ItemSelector }
})
export default class Portfolio extends Vue {
  private artworks: Artwork[]
  private activeArtwork: Artwork
  private readonly orientation: Orientation

  public constructor() {
    super()
    this.artworks = this.sortArtworksForSelector(artworks)
    this.activeArtwork = artworks[0]
    this.orientation = Orientation.VERTICAL
  }

  private sortArtworksForSelector(artworks: Artwork[]): Artwork[] {
    let middleIndex = Math.floor(artworks.length / 2) + 1
    let suffix = artworks.slice(middleIndex)
    let prefix = artworks.slice(0, middleIndex)
    return suffix.concat(prefix)
  }

  private onUpdateActiveItem(artwork: Artwork): void {
    this.activeArtwork = artwork
  }
}
</script>

<style lang="sass" scoped>
.item-selector
  position: fixed
  width: 150px
  height: 800px
  right: 40px
  top: calc(50% - 400px)
</style>
