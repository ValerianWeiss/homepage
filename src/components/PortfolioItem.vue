<template>
  <div class="portfolio-item" :ref="this.portfolioItemRef">
    <div class="artwork-title">
      <h1 :ref="this.artworkTitleTextRef" >
        {{this.activeArtwork.title}}
      </h1>
    </div>
    <div class="image-container">
      <img
        class="image width-height-100"
        :src="this.activeArtwork.previewImgUrl"
        alt="artwork image">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import Artwork from '@/misc/Artwork'
import { Marked } from '@ts-stack/markdown'
import AssetService from '@/services/AssetService'
import { getRefElement } from '../misc/helpers'

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
  private readonly artwork: Artwork

  @Prop()
  private readonly fadeInOutDuration: number

  private activeArtwork: Artwork
  private descriptionText: string = ''
  private descriptionTextCache: DescriptionTextCacheItem[] = []
  private fadeAnimationQueue: Promise<void>[] = []
  private readonly portfolioItemRef: string = 'portfolio-item'
  private readonly artworkTitleTextRef: string = 'artwork-title'

  public constructor() {
    super()
    this.activeArtwork = this.artwork
  }

  private mounted(): void {
    this.updateDescriptionText(this.artwork)
    this.setArtworkTitleTextColor(this.artwork.contrastColor)
    console.log(this.artwork.contrastColor)
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

  private setArtworkTitleTextColor(textColor: string): void {
    let element = getRefElement(this, this.artworkTitleTextRef)
    element.style.color = textColor
  }

  private startFadeArtworkAnimation(fading: Fading): Promise<void> {
    return new Promise<void>(resolve => {
      if (fading === Fading.IN) this.activeArtwork = this.artwork
      let portfolioItem = getRefElement(this, this.portfolioItemRef)
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

.artwork-title
  position: absolute
  height: 80px
  transform: rotate(270deg)
  top: 0
  bottom: 0

.image-container
  position: absolute
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: -1

.image
  object-fit: cover

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
