<template>
  <div class="item-switcher">
    <div
      class="switch-btn switch-btn-previous center-flex"
      @click="this.onPrevious">
      <span class="next-icon">&#8810;</span>
    </div>
    <div class="counter-wrapper center-flex">
      <div>
        <h4>{{this.activeItemNumber}}/{{this.totalItemCount}}</h4>
      </div>
    </div>
    <div
      class="switch-btn switch-btn-next center-flex"
      @click="this.onNext">
      <span class="next-icon">&#x226B;</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'item-switcher' })
export default class ItemSwitcher extends Vue {
  @Prop()
  private readonly activeItemNumber: number

  @Prop()
  private readonly totalItemCount: number

  private nextKeyPressed: boolean = false
  private previousKeyPressed: boolean = false

  private mounted(): void {
    this.addArrowKeyEventListeners()
  }

  private addArrowKeyEventListeners(): void {
    let nextKey = 'ArrowRight'
    let previousKey = 'ArrowLeft'

    window.addEventListener('keydown', event => {
      if (event.key === nextKey) {
        if (!this.nextKeyPressed) {
          this.nextKeyPressed = true
          this.onNext()
        }
      }

      if (event.key === previousKey) {
        if (!this.previousKeyPressed) {
          this.previousKeyPressed = true
          this.onPrevious()
        }
      }
    })

    window.addEventListener('keyup', event => {
      if (event.key === nextKey) this.nextKeyPressed = false
      if (event.key === previousKey) this.previousKeyPressed = false
    })
  }

  @Emit('nextImage')
  private onNext(): void {}

  @Emit('previousImage')
  private onPrevious(): void {}
}
</script>

<style lang="sass" scoped>
.item-switcher
  display: grid
  grid-template-columns: 50px auto 50px
  grid-template-rows: 100%
  justify-items: center
</style>>
