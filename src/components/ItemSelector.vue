<template>
  <div class="item-selector">
    <div class="navigator-arrow float-left center-flex">
      <div class="circle-btn center-flex" @click="this.onPrivous">
        <span class="next-btn">&#8810;</span>
      </div>
    </div>
    <div id="content-area" class="content-area float-left" :ref="this.contentAreaRef">
      <div class="active-item-bars"></div>
    </div>
    <div class="navigator-arrow float-right center-flex">
      <div class="circle-btn center-flex" @click="this.onNext">
        <span class="next-btn">&#x226B;</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import SelectableItem from '@/misc/SelectableItem'

@Component({ name: 'item-selector' })
export default class ItemSelector extends Vue {
  @Prop()
  public displayItemCount: number

  @Prop()
  public items: SelectableItem[]

  @Prop()
  public activeItem: SelectableItem

  private itemIndiciesToDisplay: number[] = []
  private contentAreaRef: string = 'content-area'

  private mounted(): void {
    this.checkIfPropsAreValid()
    this.initItemIndiciesToDisplay()
    this.initContentArea()
  }

  private checkIfPropsAreValid(): void {
    if (this.displayItemCount % 2 === 0) {
      throw new Error('displayItemCount has to be odd')
    } else if (this.displayItemCount > this.items.length) {
      throw new Error('There are not enough items to display.')
    }
  }

  private initItemIndiciesToDisplay(): void {
    let startIndex = Math.floor((this.items.length - this.displayItemCount) / 2)

    for (let i = 0; i < this.displayItemCount; i++) {
      this.itemIndiciesToDisplay.push(startIndex + i)
    }
  }

  private initContentArea(): void {
    // Just the Element case is getting handled here. The type is getting ingnored
    let contentArea: any = this.$refs[this.contentAreaRef]

    for (let i = 0; i < this.displayItemCount; i++) {
      let imageWrapper = document.createElement('div')
      let image = document.createElement('img')
      this.setStylingForImageWrapper(imageWrapper, i)
      this.setStylingForImage(image, i)
      imageWrapper.appendChild(image)
      contentArea.appendChild(imageWrapper)
    }
  }

  private setStylingForImageWrapper(element: any, index: number): void {
    let leftMargin = 100 / (this.displayItemCount + 1) * (index + 1)
    let size = this.calcImageWrapperSize(index, 100)
    element.style.position = 'absolute'
    element.style.width = `${size}px`
    element.style.height = `${size}px`
    element.style.backgroundColor = '#000'
    element.style.float = 'left'
    element.style.left = `calc(${leftMargin}% - ${size / 2}px)`
  }

  private calcImageWrapperSize(index: number, fullSize: number): number {
    let centerPos = Math.floor(this.displayItemCount / 2) + 1
    let itemPos = index + 1
    let dist = Math.abs(centerPos - itemPos)
    return Math.floor(fullSize - Math.pow(dist * 2, 2))
  }

  private setStylingForImage(element: any, index: number): void {
    element.style.objectFit = 'contain'
    element.src = this.items[this.itemIndiciesToDisplay[index]].previewImgUrl
    element.style.width = '100%'
    element.style.height = '100%'
  }

  public onNext(): void {
    this.itemIndiciesToDisplay.forEach((index, i) => {
      this.itemIndiciesToDisplay[i] = index + 1 === this.items.length
        ? 0 : index + 1
    })
  }

  private onPrivous(): void {
    this.itemIndiciesToDisplay.forEach((index, i) => {
      this.itemIndiciesToDisplay[i] = index - 1 < 0
        ? this.items.length - 1 : index - 1
    })
  }
}
</script>

<style lang="sass" scoped>
.item-selector
  width: 100%
  height: 100px
  margin-top: 40px

.navigator-arrow
  width: 5%
  height: 100%

.circle-btn
  height: 30px
  width: 30px
  background-color: #CCC
  border-radius: 50%

.circle-btn:hover
  background-color: #BBB

.next-btn
  margin-top: 2px

.active-item-bars
  position: absolute
  top: -7px
  width: 100px
  height: 108px
  border-style: solid
  border-left: 0
  border-right: 0
  border-color: rgba(100, 150, 255, 1)
  left: calc(50% - 49px)

.content-area
  position: relative
  width: 90%
  height: 100%
  display: flex
  align-items: center
</style>
