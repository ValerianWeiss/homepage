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
      v-on:updateActiveItem="this.onUpdateActiveArtwork">
    </item-selector>
    <item-switcher
      class="item-switcher"
      :activeItemNumber="this.activeImageNumber"
      :totalItemCount="this.activeArtwork.imageUrls.length"
      v-on:nextImage="this.onNextImage"
      v-on:previousImage="this.onPreviousImage">
    </item-switcher>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProtfolioItem from '@/components/PortfolioItem.vue'
import ItemSelector, { Orientation } from '@/components/ItemSelector.vue'
import ItemSwitcher from '@/components/ItemSwitcher.vue'
import artworks from '@/misc/artworks'
import Artwork from '@/misc/Artwork'
import { throwVariableIsUndefinedError } from '@/misc/errors'

@Component({
  name: 'portfolio',
  components: {
    ProtfolioItem,
    ItemSelector,
    ItemSwitcher
  }
})
export default class Portfolio extends Vue {
  private artworks: Artwork[]
  private activeArtwork: Artwork
  private activeImageUrl: string
  private activeImageNumber: number
  private readonly orientation: Orientation

  public constructor() {
    super()
    this.artworks = this.sortArtworksForSelector(artworks)
    this.activeArtwork = artworks[0]
    this.activeImageUrl = this.activeArtwork.imageUrls[0]
    this.activeImageNumber = this.activeArtwork.getImageState().index + 1
    this.orientation = Orientation.VERTICAL
  }

  private sortArtworksForSelector(artworks: Artwork[]): Artwork[] {
    let middleIndex = Math.floor(artworks.length / 2) + 1
    let suffix = artworks.slice(middleIndex)
    let prefix = artworks.slice(0, middleIndex)
    return suffix.concat(prefix)
  }

  private onUpdateActiveArtwork(artwork: Artwork): void {
    this.activeArtwork = artwork
    let imageState = this.activeArtwork.getImageState()
    this.setImage(imageState.url, imageState.index)
  }

  private onNextImage(): void {
    let imageState = this.activeArtwork.nextImage()
    this.setImage(imageState.url, imageState.index)
  }

  private onPreviousImage(): void {
    let imageState = this.activeArtwork.previousImage()
    this.setImage(imageState.url, imageState.index)
  }

  private setImage(imageUrl: string, imageIndex: number) {
    this.activeImageNumber = imageIndex + 1
    this.activeImageUrl = imageUrl
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

.item-switcher
  position: fixed
  width: 500px
  height: 40px
  bottom: 50px
  left: calc(50% - 250px)
</style>
