<template>
  <div class="portfolio-item">
    <div class="heading">
      <h1>{{this.artwork.title}}</h1>
    </div>
    <div class="image-container float-left">
      <img
        class="image width-height-100"
        :src="require(`@/assets${this.artwork.previewImgPath}`)"
        alt="artwork image"
      >
    </div>
    <div class="text-container">
      <p class=text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut tincidunt quam. Morbi volutpat metus vel risus tincidunt hendrerit. Nulla facilisi. In hac habitasse platea dictumst. Suspendisse sagittis, sem id feugiat hendrerit, sapien velit bibendum tellus, nec scelerisque lorem nisi id magna. In vel tellus ultrices elit faucibus ultricies. Etiam hendrerit ullamcorper orci, sit amet ultrices enim cursus quis.
        Nulla facilisi. Donec euismod at massa non lacinia. Donec in fringilla augue, vel vulputate mi. Praesent eget ipsum eget est condimentum vestibulum. Nulla et maximus mauris. Donec facilisis facilisis diam, sed malesuada erat eleifend quis. In mattis id nisi ac rutrum. Curabitur porta nibh quam, in maximus turpis mattis vel. Morbi in tempor mi, vitae blandit sapien. Aliquam erat volutpat. Quisque facilisis odio massa, eget rutrum est rhoncus id. Vestibulum vulputate magna non iaculis pulvinar. Quisque tempor porttitor dignissim. Integer faucibus maximus ex at tincidunt. Duis metus felis, sollicitudin eget elementum nec, pulvinar sagittis arcu. Nulla vestibulum facilisis erat, nec finibus mi lobortis mollis.
      </p>
    </div>
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
.portfolio-item
  height: 100%

.heading
  height: 80px
  margin-bottom: 30px

.image-container
  width: 50%
  height: calc(100% - 110px)

.image
  object-fit: contain
  object-position: 0 0

.text-container
  width: 50%
  float: left

.text
  margin: 0 25px 0 25px
</style>
