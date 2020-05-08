import SelectableItem from '@/misc/SelectableItem'

export default class Artwork implements SelectableItem {
  public title: string
  public previewImgUrl: string
  public descriptionTextUrl: string

  public constructor(title: string, previewImgUrl: string, descriptionTextUrl: string) {
    this.title = title
    this.previewImgUrl = previewImgUrl
    this.descriptionTextUrl = descriptionTextUrl
  }
}
