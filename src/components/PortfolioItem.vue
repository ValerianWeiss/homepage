<template>
  <div class="portfolio-item">
      <img
        class="item"
        :src="require(`@/assets${this.artwork.previewImgPath}`)"
        alt="artwork image"
      >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Artwork from '@/misc/Artwork'

@Component({ name: 'protfolio-item' })
export default class PortfolioItem extends Vue {
  @Prop()
  public artwork: Artwork
}
</script>

<style lang="sass" scoped>
.item
  width: 100%
</style>
