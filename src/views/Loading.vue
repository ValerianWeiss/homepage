<template>
  <div class="loading">
    <div id="content">
      <div id="loading-icon-wrapper">
        <h1 class="h1-bright">L</h1>
      </div>
      <div id="loading-bar">
        <div id="loading-bar-plain" class="loading-bar">
          <div
            id="loading-bar-progress" class="loading-bar"
            v-bind:style="{width: this.loadingBarProgressSize + 'px'}">
          </div>
        </div>
        <div id="percentage-wrapper">
          <h4
            id="loading-percentage"
            class="h4-bright">
            {{this.loadingPercentage * 100}}%
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
    this.loadingPercentage = 0.9
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
}
</script>

<style lang="sass" scoped>
h1
  text-align: center

.loading
  margin: 0
  padding: 0
  height: 100vh
  width: 100vw

#content
  position: absolute
  height: 200px
  width: 500px
  margin-top: calc(50vh - 150px)
  margin-left: calc(50vw - 250px)

#loading-icon-wrapper
  height: 100px
  width: 100px
  margin: auto

.loading-bar
  height: 2px
  border-radius: 2px

#loading-bar-plain
  width: 400px
  background-color: rgba(255, 255, 255, .5)
  margin: 20px auto 15px auto

#loading-bar-progress
  background: linear-gradient(270deg, #4eff00, #B4FFA1, #4eff00)
  background-size: 900% 900%
  animation: loadingBarGradient 2s ease infinite

#loading-percentage
  text-align: center

@keyframes loadingBarGradient
  0%
    background-position: 0% 50%
  50%
    background-position: 100% 50%
  100%
    background-position: 100% 50%

</style>
