import SelectableItem from '@/misc/SelectableItem'

export default class Artwork implements SelectableItem {
  public title: string
  public previewImgUrl: string

  public constructor(title: string, previewImgUrl: string) {
    this.title = title
    this.previewImgUrl = previewImgUrl
  }
}
