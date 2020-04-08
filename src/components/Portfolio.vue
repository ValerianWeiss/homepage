<template>
  <div class="portfolio">
    <protfolio-item
      class="item"
      :artwork="activeArtwork">
    </protfolio-item>
    <item-selector
      :activeItem="this.activeItem"
      :items="this.selectableItems"
      :displayItemCount="5">
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
import SelectableItem from '../misc/SelectableItem'

@Component({
  name: 'protfolio',
  components: { ProtfolioItem, ItemSelector }
})
export default class Portfolio extends Vue {
  private artworks: Artwork[]
  private activeArtwork: Artwork

  public constructor() {
    super()
    this.artworks = artworks
    this.activeArtwork = this.artworks[0]
  }

  private sortArtworksForSelector(): Artwork[] {
    let middleIndex = Math.floor(this.artworks.length / 2) + 1
    let suffix = this.artworks.slice(middleIndex)
    let prefix = this.artworks.slice(0, middleIndex)
    return suffix.concat(prefix)
  }

  private get activeItem(): SelectableItem {
    return new SelectableItem(
      this.activeArtwork.previewImgPath,
      this.activeArtwork.title,
      this.activeArtwork.previewImgUrl)
  }

  private get selectableItems(): SelectableItem[] {
    let items: SelectableItem[] = []
    let sortedArtworks = this.sortArtworksForSelector()

    sortedArtworks.forEach(artwork => {
      let selectableItem = new SelectableItem(
        artwork.previewImgPath,
        artwork.title,
        artwork.previewImgUrl)
      items.push(selectableItem)
    })
    return items
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
