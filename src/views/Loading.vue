<template>
  <div class="width-height-100 margin-padding-0">
    <div class="content-container">
      <div class="loading-icon-container">
        <crystal class="width-height-100"></crystal>
      </div>
      <div class="loading-bar">
        <div class="loading-bar-plain loading-bar">
          <div
            class="loading-bar-progress loading-bar"
            v-bind:style="{width: this.loadingBarProgressSize + 'px'}">
          </div>
        </div>
        <div class="percentage-container">
          <h4
            class="loading-percentage">
            {{this.loadingPercentage * 100}}%
          </h4>
        </div>
      </div>
      <div class="swipe-up-container center" v-if="this.isReady">
        <svg class="height-80 width-100" viewbox="0 0 100 100" preserveAspectRatio="none">
          <ellipse class="scroll-ellipse" cx="50%" cy="80%" rx="5" ry="5" style="fill: black" />
          <ellipse cx="50%" cy="5%" rx="5" ry="5" style="fill: black" />
          <line x1="50%" y1="80%" x2="50%" y2="5%" stroke="black" />
          <line x1="50%" y1="92%" x2="50%" y2="85%" stroke="black" />
          <line x1="50%" y1="100%" x2="50%" y2="97%" stroke="black" />
        </svg>
        <div class="center-flex height-20">
          <h4 class="heading-light">
            <span class="side-margin-10">──</span>
            scroll or swipe up
            <span class="side-margin-10">──</span>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Crystal from '../components/Crystal.vue'
import '@/main.sass'

@Component({
  name: 'loading',
  components: { Crystal }
})
export default class Loading extends Vue {
  private loadingPercentage: number
  private loadingBarPlainElement: Element | null

  public constructor() {
    super()
    this.loadingPercentage = 1
    this.loadingBarPlainElement = null
  }

  private mounted(): void {
    this.loadingBarPlainElement = document.querySelector('.loading-bar-plain')
  }

  private get loadingBarProgressSize(): number {
    return this.loadingBarPlainElement
      ? this.loadingBarPlainElement.clientWidth * this.loadingPercentage
      : 0
  }

  private get isReady(): boolean {
    return this.loadingPercentage === 1
  }
}
</script>

<style lang="sass" scoped>
.content-container
  position: absolute
  margin-top: 25vh
  margin-left: calc(50vw - 12.5vw)
  height: 75vh
  width: 25vw

.loading-icon-container
  margin: auto
  width: 300px
  height: 300px

.loading-bar
  height: 2px
  border-radius: 2px

.loading-bar-plain
  margin: 0 auto 15px auto
  width: 100%
  background-color: rgba(0, 0, 0, .5)

.loading-bar-progress
  background: #4eff00

.loading-percentage
  text-align: center

.swipe-up-container
  position: absolute
  height: 25vh
  width: 100%
  bottom: 10px

.scroll-ellipse
  animation: scrollUp 2s ease infinite

@media screen and (max-width: 720px)
  .content-container
    margin: 15vh 10vw 0 10vw
    width: 80vw
    height: 85vh

@keyframes scrollUp
  0%
    transform: translate(50%, 80%) scale(0)
  100%
    transform: translate(0%, -75%) scale(1)
</style>
