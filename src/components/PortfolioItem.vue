<template>
  <div class="portfolio-item" :ref="this.portfolioItemRef">
    <div class="heading">
      <h1>{{this.activeArtwork.title}}</h1>
    </div>
    <div class="image-container float-left">
      <img
        class="image width-height-100"
        :src="this.activeArtwork.previewImgUrl"
        alt="artwork image">
    </div>
    <div
      class="text-container"
      v-html="this.descriptionText">
    </div>
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

enum Fading {
  IN,
  OUT
}

@Component({ name: 'protfolio-item' })
export default class PortfolioItem extends Vue {
  @Prop()
  public artwork: Artwork

  @Prop()
  public readonly fadeInOutDuration: number

  private activeArtwork: Artwork
  private descriptionText: string = ''
  private descriptionTextCache: DescriptionTextCacheItem[] = []
  private portfolioItemRef: string = 'portfolio-item'
  private fadeAnimationQueue: Promise<void>[] = []

  public constructor() {
    super()
    this.activeArtwork = this.artwork
  }

  private mounted(): void {
    this.updateDescriptionText(this.artwork)
    this.startFadeArtworkAnimation(Fading.IN)
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

  private startFadeArtworkAnimation(fading: Fading): Promise<void> {
    return new Promise<void>(resolve => {
      if (fading === Fading.IN) this.activeArtwork = this.artwork
      let portfolioItem = this.getPortfolioItem()
      let startTime = new Date().getTime()

      let animationInterval = setInterval(() => {
        let ellapsedTime = new Date().getTime() - startTime

        if (ellapsedTime >= this.fadeInOutDuration / 2) {
          portfolioItem.style.opacity = fading === Fading.IN ? '1' : '0'
          clearInterval(animationInterval)
          resolve()
        }

        let progress = ellapsedTime / (this.fadeInOutDuration / 2)
        let opacity = fading === Fading.IN ? progress : 1 - progress
        portfolioItem.style.opacity = `${opacity}`
      }, 1000 / 60)
    })
  }

  private fadeArtwork(): Promise<void> {
    let animationPromise = new Promise<void>(resolve => {
      Promise.all(this.fadeAnimationQueue).then(() => {
        this.startFadeArtworkAnimation(Fading.OUT).then(() => {
          this.startFadeArtworkAnimation(Fading.IN).then(() => {
            resolve()
            let animationIndex = this.fadeAnimationQueue.indexOf(animationPromise)
            this.fadeAnimationQueue.splice(animationIndex, 1)
          })
        })
      })
    })

    this.fadeAnimationQueue.push(animationPromise)
    return animationPromise
  }

  private getPortfolioItem(): any {
    return this.$refs[this.portfolioItemRef]
  }

  private insertDescriptionText(descriptionText: string): void {
    this.descriptionText = descriptionText
  }

  @Watch('artwork')
  private onArtworkChange(newArtwork: Artwork, oldArtwork: Artwork): void {
    this.updateDescriptionText(newArtwork)
    this.fadeArtwork()
  }
}
</script>

<style lang="sass" scoped>
.portfolio-item
  height: 100%
  opacity: 0

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
  overflow: auto auto

.text
  margin: 0 25px 15px 25px

.small-heading
  margin: 0px 25px 5px 25px
</style>
