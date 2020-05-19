<template>
  <div class="portfolio-item" :ref="this.portfolioItemRef">
    <div class="artwork-title-wrapper">
      <h1
      class="artwork-title"
      :ref="this.artworkTitleTextRef" >
        {{this.activeArtwork.title}}
      </h1>
    </div>
    <div class="image-container">
      <img
        class="image width-height-100"
        :src="this.imageUrl">
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

  private activeArtwork: Artwork = this.artwork
  private descriptionText: string = ''
  private descriptionTextCache: DescriptionTextCacheItem[] = []
  private fadeAnimationQueue: Promise<void>[] = []
  private readonly portfolioItemRef: string = 'portfolio-item'
  private readonly artworkTitleTextRef: string = 'artwork-title'

  private mounted(): void {
    this.updateDescriptionText(this.artwork)
    this.setArtworkTitleTextColor(this.artwork.contrastColor)
    this.startFadeArtworkAnimation(Fading.IN)
  }

  private get imageUrl(): string {
    return this.activeArtwork.getImageState().url
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

  private insertDescriptionText(descriptionText: string): void {
    this.descriptionText = descriptionText
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

  private startFadeArtworkAnimation(fading: Fading, artwork?: Artwork): Promise<void> {
    return new Promise<void>(resolve => {
      if (fading === Fading.IN && artwork !== undefined) {
        this.activeArtwork = artwork
      }

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

  private fadeArtwork(artwork?: Artwork): Promise<void> {
    let animationPromise = new Promise<void>(resolve => {
      Promise.all(this.fadeAnimationQueue).then(() => {
        this.startFadeArtworkAnimation(Fading.OUT).then(() => {
          this.startFadeArtworkAnimation(Fading.IN, artwork).then(() => {
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

  @Watch('artwork')
  private onArtworkChange(newArtwork: Artwork, oldArtwork: Artwork): void {
    this.updateDescriptionText(newArtwork)
    this.fadeArtwork(newArtwork)
  }
}
</script>

<style lang="sass" scoped>
.artwork-title-wrapper
  position: absolute
  width: 800px
  left: -330px
  bottom: 400px

.artwork-title
  transform: rotate(270deg)

.image-container
  position: absolute
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: -1

.image
  object-fit: cover
</style>
