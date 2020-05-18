<template>
  <div :class="`item-selector ${this.orientationClass}`">
    <div class="navigator-arrow center-flex">
      <div class="circle-btn center-flex" @click="this.onPrivous">
        <span class="next-icon">&#8810;</span>
      </div>
    </div>
    <div
      class="content-area"
      :ref="this.contentAreaRef">
      <div class="active-item-bars"></div>
    </div>
    <div class="navigator-arrow center-flex">
      <div class="circle-btn center-flex" @click="this.onNext">
        <span class="next-icon">&#x226B;</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'vue-property-decorator'
import SelectableItem from '@/misc/SelectableItem'
import { throwVariableIsUndefinedError } from '@/misc/errors'
import { getRefElement } from '@/misc/helpers'

interface ImageWrapper {
  element: HTMLDivElement,
  position: number
  itemIndex: number
  previewImgUrl: string
}

enum Direction {
  FORWARD,
  BACKWARDS
}

enum Side {
  FRONT,
  END
}

enum Orientation {
  VERTICAL,
  HORIZONTAL
}

@Component({ name: 'item-selector' })
export default class ItemSelector extends Vue {
  @Prop()
  private readonly displayItemCount: number

  @Prop()
  private readonly items: SelectableItem[]

  @Prop()
  private readonly activeItem: SelectableItem

  @Prop()
  private readonly animationDuration: number

  @Prop()
  private readonly imageWrapperSize: number

  @Prop()
  private readonly orientation: Orientation

  private imageWrappers: ImageWrapper[] = []
  private animationQueue: Promise<void>[] = []
  private isContentAreaInizialized: boolean = false
  private previousKeyPressed: boolean = false
  private nextKeyPressed: boolean = false
  private readonly contentAreaRef: string = 'content-area'

  private mounted(): void {
    this.checkIfPropsAreValid()
    this.initContentArea()
    this.addArrowKeyEventListeners()
  }

  private get orientationClass(): string {
    return this.orientation === Orientation.HORIZONTAL
      ? 'horizontal-item-selector'
      : 'vertical-item-selector'
  }

  private get nextKey(): string {
    return this.orientation === Orientation.VERTICAL ? 'ArrowUp' : 'ArrowRight'
  }

  private get previousKey(): string {
    return this.orientation === Orientation.VERTICAL ? 'ArrowDown' : 'ArrowLeft'
  }

  private checkIfPropsAreValid(): void {
    if (this.displayItemCount % 2 === 0) {
      throw new Error('displayItemCount has to be odd')
    } else if (this.displayItemCount > this.items.length) {
      throw new Error('There are not enough items to display.')
    }
  }

  private addArrowKeyEventListeners(): void {
    window.addEventListener('keydown', event => {
      if (event.key === this.nextKey) {
        if (!this.nextKeyPressed) {
          this.nextKeyPressed = true
          this.onNext()
        }
      }

      if (event.key === this.previousKey) {
        if (!this.previousKeyPressed) {
          this.previousKeyPressed = true
          this.onPrivous()
        }
      }
    })

    window.addEventListener('keyup', event => {
      if (event.key === this.nextKey) this.nextKeyPressed = false
      if (event.key === this.previousKey) this.previousKeyPressed = false
    })
  }

  private initContentArea(): void {
    let itemIndiciesToDisplay = []
    let startIndex = Math.floor((this.items.length - this.displayItemCount) / 2)

    for (let i = 0; i < this.displayItemCount; i++) {
      itemIndiciesToDisplay.push(startIndex + i)
    }

    for (let i = 0; i < this.displayItemCount; i++) {
      let itemIndex = itemIndiciesToDisplay[i]
      let imageWrapper = this.createImageWrapper(Side.END, this.items[itemIndex])
      this.imageWrappers.push(imageWrapper)
    }
    this.isContentAreaInizialized = true
  }

  private createImageWrapper(side: Side, item: SelectableItem): ImageWrapper {
    let position = this.getPositionForNewItem(side)
    let element = document.createElement('div')
    let image = document.createElement('img')
    this.setStylingForImageWrapper(element, position)
    this.setStylingForImage(image, position, item)
    element.appendChild(image)
    getRefElement(this, this.contentAreaRef).appendChild(element)

    return {
      element,
      position,
      itemIndex: this.items.indexOf(item),
      previewImgUrl: item.previewImgUrl
    }
  }

  private getPositionForNewItem(side: Side): number {
    if (side === Side.FRONT) {
      this.incrementImageWrapperPositions()
      return 0
    }
    return this.imageWrappers.length
  }

  private setStylingForImageWrapper(element: any, position: number): void {
    let size = this.calcImageWrapperSize(position, this.imageWrapperSize)
    this.setMarginsForImageWrapper(element, position, size)

    element.style.position = 'absolute'
    element.style.width = `${size}px`
    element.style.height = `${size}px`
    element.style.backgroundColor = '#000'
    element.style.float = 'left'
  }

  private setMarginsForImageWrapper(element: any, position: number, size: number): void {
    let margin = this.calcImageWrapperMargin(position)

    if (this.orientation === Orientation.HORIZONTAL) {
      element.style.left = `calc(${margin}% - ${size / 2}px)`
    } else {
      element.style.top = `calc(${margin}% - ${size / 2}px)`
      element.style.left = `calc(50% - ${size / 2}px)`
    }
  }

  private setStylingForImage(element: any, index: number, item: SelectableItem): void {
    element.style.objectFit = 'contain'
    element.src = item.previewImgUrl
    element.style.width = '100%'
    element.style.height = '100%'
  }

  private calcImageWrapperMargin(position: number): number {
    return 100 / (this.displayItemCount + 1) * (position + 1)
  }

  private calcImageWrapperSize(position: number, progress?: number, direction?: Direction): number {
    let size

    if (!this.isContentAreaInizialized) {
      size = this.calcImageWrapperSizeForPosition(position, this.imageWrapperSize)
    } else if (this.isContentAreaInizialized && progress !== undefined && direction !== undefined) {
      let distFactor = this.easeInOutQuad(progress)
      let directionFactor = this.getDirectionFactor(direction)
      let currentSize = this.calcImageWrapperSizeForPosition(position, direction)
      let newSize = this.calcImageWrapperSizeForPosition(position + directionFactor, direction)

      size = currentSize + (newSize - currentSize) * distFactor

      if (position === 0) {
        if (progress > 0.5) {
          size = direction === Direction.FORWARD ? size : 0
        } else {
          size = direction === Direction.BACKWARDS ? size : 0
        }
      } else if (position === this.imageWrappers.length - 1) {
        if (progress > 0.5) {
          size = direction === Direction.BACKWARDS ? size : 0
        } else {
          size = direction === Direction.FORWARD ? size : 0
        }
      }
    }
    return size === undefined ? 0 : size
  }

  private calcImageWrapperSizeForPosition = (position: number, direction?: Direction): number => {
    let centerPos = Math.floor(this.displayItemCount / 2) + 1
    let itemPos = direction === Direction.FORWARD ? position : position + 1
    let dist = Math.abs(centerPos - itemPos)
    return Math.floor(this.imageWrapperSize - Math.pow(dist * 2, 2))
  }

  private selectItem(direction: Direction): Promise<void> {
    let animationPromise = new Promise<void>(resolve => {
      Promise.all(this.animationQueue).then(() => {
        let startTime = new Date().getTime()
        let directionFactor = this.getDirectionFactor(direction)

        this.addNewImageWrapper(direction)

        let animationInterval = setInterval(() => {
          let ellapsedTime = new Date().getTime() - startTime
          let progress = ellapsedTime < this.animationDuration ? ellapsedTime / this.animationDuration : 1
          let distFactor = this.easeInOutQuad(progress)
          let totalDist = directionFactor * this.calcImageWrapperMargin(0)

          this.imageWrappers.forEach(imageWrapper => {
            this.updateImageWrapperStyling(imageWrapper, progress, direction, distFactor, totalDist)
          })

          if (progress === 1) {
            direction === Direction.FORWARD ? this.removeLastImageWrapper() : this.removeFirstImageWrapper()
            clearInterval(animationInterval)
            resolve()
            let animationIndex = this.animationQueue.indexOf(animationPromise)
            this.animationQueue.splice(animationIndex, 1)
          }
        }, 1000 / 60)
      })
    })

    this.animationQueue.push(animationPromise)
    return animationPromise
  }

  private getDirectionFactor(direction: Direction): number {
    return direction === Direction.FORWARD ? 1 : -1
  }

  private updateImageWrapperStyling(imageWrapper: ImageWrapper, progress: number, direction: Direction, distFactor: number, totalDist: number): void {
    let position = imageWrapper.position
    let size = this.calcImageWrapperSize(position, progress, direction)
    let margin = direction === Direction.FORWARD
      ? this.calcImageWrapperMargin(position) + distFactor * totalDist - totalDist
      : this.calcImageWrapperMargin(position) + distFactor * totalDist

    this.updateImageWrapperMargins(imageWrapper, size, margin)

    imageWrapper.element.style.width = `${size}px`
    imageWrapper.element.style.height = `${size}px`
  }

  private updateImageWrapperMargins(imageWrapper: ImageWrapper, size: number, margin: number): void {
    if (this.orientation === Orientation.HORIZONTAL) {
      imageWrapper.element.style.left = `calc(${margin}% - ${size / 2}px)`
    } else {
      imageWrapper.element.style.top = `calc(${margin}% - ${size / 2}px)`
      imageWrapper.element.style.left = `calc(50% - ${size / 2}px)`
    }
  }

  private addNewImageWrapper(direction: Direction) {
    direction === Direction.FORWARD
      ? this.addNewImageWrapperAsFirst()
      : this.addNewImageWrapperAsLast()
  }

  private addNewImageWrapperAsFirst(): void {
    let itemIndexOfFirstItem = this.imageWrappers[0].itemIndex
    let itemIndexOfNewItem = itemIndexOfFirstItem - 1 < 0
      ? this.items.length - 1 : itemIndexOfFirstItem - 1

    let newItem = this.items[itemIndexOfNewItem]
    let newImageWrapper = this.createImageWrapper(Side.FRONT, newItem)
    this.imageWrappers.unshift(newImageWrapper)
  }

  private addNewImageWrapperAsLast(): void {
    let itemIndexOfLastItem = this.imageWrappers[this.imageWrappers.length - 1].itemIndex
    let itemIndexOfNewItem = itemIndexOfLastItem + 1 === this.items.length
      ? 0 : itemIndexOfLastItem + 1

    let newItem = this.items[itemIndexOfNewItem]
    let newImageWrapper = this.createImageWrapper(Side.END, newItem)
    this.imageWrappers.push(newImageWrapper)
  }

  private removeFirstImageWrapper(): void {
    let imageWrapper = this.imageWrappers.shift()
    this.decrementImageWrapperPositions()
    this.removeImageWrapperFromDom(imageWrapper)
  }

  private removeLastImageWrapper(): void {
    let imageWrapper = this.imageWrappers.pop()
    this.removeImageWrapperFromDom(imageWrapper)
  }

  private removeImageWrapperFromDom(imageWrapper: ImageWrapper | undefined): void {
    imageWrapper === undefined
      ? throwVariableIsUndefinedError()
      : this.removeDomElement(imageWrapper.element)
  }

  private incrementImageWrapperPositions(): void {
    this.imageWrappers.forEach(imageWrapper => {
      imageWrapper.position += 1
    })
  }

  private decrementImageWrapperPositions(): void {
    this.imageWrappers.forEach(imageWrapper => {
      imageWrapper.position -= 1
    })
  }

  private removeDomElement(element: HTMLElement) {
    if (element.parentNode != null) {
      element.parentNode.removeChild(element)
    } else {
      throw new Error('removeDomElement failed. Element could not be removed, bacause parentNode is null')
    }
  }

  // The variable x represents the absolute progress of the animation in
  // the bounds of 0 (beginning of the animation) and 1 (end of animation).
  private easeInOutQuad(progress: number): number {
    return progress < 0.5
      ? 2 * Math.pow(progress, 2)
      : 1 - Math.pow(-2 * progress + 2, 2) / 2
  }

  public onNext(): void {
    let direction = this.orientation === Orientation.VERTICAL
      ? Direction.BACKWARDS : Direction.FORWARD

    this.selectItem(direction)
    this.updateActiveArtwork(Direction.BACKWARDS)
  }

  private onPrivous(): void {
    let direction = this.orientation === Orientation.VERTICAL
      ? Direction.FORWARD : Direction.BACKWARDS

    this.selectItem(direction)
    this.updateActiveArtwork(Direction.FORWARD)
  }

  @Emit('updateActiveItem')
  public updateActiveArtwork(direction: Direction): SelectableItem {
    let step = direction === Direction.FORWARD ? 1 : -1
    if (this.orientation === Orientation.VERTICAL) step *= -1
    let activeItemIndex = this.items.indexOf(this.activeItem)
    let newActiveItemIndex

    if (activeItemIndex + step < 0) {
      newActiveItemIndex = this.items.length - 1
    } else if (activeItemIndex + step >= this.items.length) {
      newActiveItemIndex = 0
    } else {
      newActiveItemIndex = activeItemIndex + step
    }

    return this.items[newActiveItemIndex]
  }
}

export {
  Orientation
}
</script>

<style lang="sass" scoped>
.horizontal-item-selector
  display: grid
  grid-template-columns: [line-start] 50px [line1] auto [line2] 50px [line-end]
  justify-items: center

  .active-item-bars
    width: 100px
    height: 108px
    border-left: 0
    border-right: 0
    left: calc(50% - 49px)

.vertical-item-selector
  display: grid
  grid-template-rows: [line-start] 50px [line1] auto [line2] 50px [line-end]
  justify-items: center

  .active-item-bars
    width: 108px
    height: 100px
    border-top: 0
    border-bottom: 0
    left: calc(50% - 57px)

  .circle-btn
    transform: rotate(90deg)

.active-item-bars
  position: absolute
  border-style: solid
  border-color: rgba(100, 150, 255, 1)

.circle-btn
  height: 30px
  width: 30px
  background-color: #CCC
  border-radius: 50%

.circle-btn:hover
  background-color: #BBB

.content-area
  position: relative
  width: 100%
  height: 100%
  display: flex
  align-items: center
</style>
