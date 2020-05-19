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
    <div class="scroll-down-info center-flex">
      <svg class="scroll-down-icon">
        <polygon class="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "/>
        <polygon class="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "/>
        <polygon class="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "/>
      </svg>
    </div>
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
  bottom: 75px
  left: calc(50% - 250px)

.scroll-down-info
  position: fixed
  width: 200px
  height: 50px
  bottom: 20px
  left: calc(50% - 100px)

.scroll-down-icon
  width: 75px
  height: 65px
  transform: scale(0.5)

  &:hover
    polygon
      transition: all .2s ease-out

      &.arrow-bottom
        transform: translateY(-18px)

      &.arrow-top
        transform: translateY(18px)

polygon
  transition: all .2s ease-out

  &.arrow-middle
    opacity: 0.75

  &.arrow-top
    opacity: 0.5
</style>
