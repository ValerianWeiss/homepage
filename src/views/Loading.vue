<template>
  <div class="loading-container margin-padding-0">
    <div id="content-container">
      <div id="loading-icon-container">
        <h1 class="h1-bright">L</h1>
      </div>
      <div id="loading-bar">
        <div id="loading-bar-plain" class="loading-bar">
          <div
            id="loading-bar-progress" class="loading-bar"
            v-bind:style="{width: this.loadingBarProgressSize + 'px'}">
          </div>
        </div>
        <div id="percentage-container">
          <h4
            id="loading-percentage"
            class="h4-bright">
            {{this.loadingPercentage * 100}}%
          </h4>
        </div>
      </div>
      <div id="down-container" class="center">
        <svg class="height-80 width-100" viewbox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50%" y1="0%" x2="50%" y2="3%" stroke="white" />
          <line x1="50%" y1="7%" x2="50%" y2="12%" stroke="white" />
          <line x1="50%" y1="16%" x2="50%" y2="95%" stroke="white" />
          <ellipse cx="50%" cy="95%" rx="5" ry="5" style="fill: white"/>
          <ellipse cx="50%" cy="50%" rx="3" ry="3" style="fill: white"/>
        </svg>
        <div class="center-flex height-20">
          <h4 class="h4-bright-light">
            <span class="side-margin-10">──</span>
            scroll or press down
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
import '@/main.sass'

@Component({ name: 'loading' })
export default class Loading extends Vue {
  private loadingPercentage: number
  private loadingBarPlainElement: Element | null

  public constructor() {
    super()
    this.loadingPercentage = 0.5
    this.loadingBarPlainElement = null
  }

  private mounted() {
    this.loadingBarPlainElement = document.querySelector('#loading-bar-plain')
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
h1
  text-align: center

.loading-container
  height: 100vh
  width: 100vw

#content-container
  position: absolute
  height: 25vh
  width: 25vw
  margin-top: calc(50vh - 150px)
  margin-left: calc(50vw - 12.5vw)

#loading-icon-container
  height: 100px
  width: 100px
  margin: auto

.loading-bar
  height: 2px
  border-radius: 2px

#loading-bar-plain
  width: 100%
  background-color: rgba(255, 255, 255, .5)
  margin: 20px auto 15px auto

#loading-bar-progress
  background: linear-gradient(270deg, #4eff00, #B4FFA1, #4eff00)
  background-size: 900% 900%
  animation: loadingBarGradient 2s ease infinite

#loading-percentage
  text-align: center

#down-container
  position: absolute
  height: 25vh
  width: 100%
  top: 35vh

@keyframes loadingBarGradient
  0%
    background-position: 0% 50%
  50%
    background-position: 100% 50%
  100%
    background-position: 100% 50%

</style>
