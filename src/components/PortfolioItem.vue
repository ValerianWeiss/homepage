<template>
  <div class="portfolio-item">
    <div class="heading">
      <h1>{{this.artwork.title}}</h1>
    </div>
    <div class="image-container float-left">
      <img
        class="image width-height-100"
        :src="this.artwork.previewImgUrl"
        alt="artwork image"
      >
    </div>
    <div class="text-container" v-html="this.descriptionText"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import Artwork from '@/misc/Artwork'
import { Marked } from '@ts-stack/markdown'
import AssetService from '@/services/AssetService'

interface DescriptionTextCacheItem {
  artworkTitle: string,
  descriptionText: string
}

@Component({ name: 'protfolio-item' })
export default class PortfolioItem extends Vue {
  @Prop()
  public artwork: Artwork

  private descriptionText: string = ''
  private descriptionTextCache: DescriptionTextCacheItem[] = []

  private mounted(): void {
    this.updateDescriptionText(this.artwork)
  }

  private updateDescriptionText(artwork: Artwork) {
    let descriptionTextCacheItem = this.descriptionTextCache.find(item => {
      return item.artworkTitle === artwork.title
    })

    if (descriptionTextCacheItem) {
      this.insertDescriptionText(descriptionTextCacheItem.descriptionText)
    } else {
      this.getDescriptionText(artwork).then(descriptionText => {
        this.insertDescriptionText(descriptionText)
      })
    }
  }

  private getDescriptionText(artwork: Artwork): Promise<string> {
    return AssetService.getArtworkDescriptionText(artwork).then(res => {
      let descriptionText = Marked.parse(res.data)
      this.descriptionTextCache.push({
        artworkTitle: artwork.title,
        descriptionText: descriptionText
      })

      return descriptionText
    })
  }

  private insertDescriptionText(descriptionText: string): void {
    this.descriptionText = descriptionText
  }

  @Watch('artwork')
  private onArtworkChange(newArtwork: Artwork, oldArtwork: Artwork): void {
    this.updateDescriptionText(newArtwork)
  }
}
</script>

<style lang="sass" scoped>
.portfolio-item
  height: 100%

.heading
  height: 80px
  margin-bottom: 30px

.image-container
  width: 40%
  height: calc(100% - 110px)

.image
  object-fit: contain
  object-position: 0 0

.text-container
  height: calc(100% - 110px)
  width: 60%
  float: left
  overflow-y: auto

.text
  margin: 0 25px 15px 25px

.small-heading
  margin: 0px 25px 5px 25px
</style>
