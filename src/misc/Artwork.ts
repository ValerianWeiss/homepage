import SelectableItem from '@/misc/SelectableItem'

interface ImageState {
  url: string,
  index: number
}

export default class Artwork implements SelectableItem {
  public title: string
  public previewImgUrl: string
  public descriptionTextUrl: string
  public contrastColor: string
  public imageUrls: string[]
  private imageState: ImageState

  public constructor(
    title: string,
    previewImgUrl: string,
    imageUrls: string[],
    descriptionTextUrl: string,
    contrastColor: string) {
    this.title = title
    this.previewImgUrl = previewImgUrl
    this.descriptionTextUrl = descriptionTextUrl
    this.contrastColor = contrastColor
    this.imageUrls = imageUrls
    this.imageState = {
      url: this.imageUrls[0],
      index: 0
    }
  }

  public nextImage(): ImageState {
    let newIndex = this.imageState.index + 1 >= this.imageUrls.length
      ? 0 : this.imageState.index + 1

    this.setImageState(newIndex)
    return this.imageState
  }

  public previousImage(): ImageState {
    let newIndex = this.imageState.index - 1 < 0
      ? this.imageUrls.length - 1 : this.imageState.index - 1

    this.setImageState(newIndex)
    return this.imageState
  }

  private setImageState(index: number) {
    this.imageState = {
      url: this.imageUrls[index],
      index
    }
  }

  public getImageState(): ImageState {
    return this.imageState
  }
}
