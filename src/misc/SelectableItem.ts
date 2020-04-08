export default class SelectableItem {
  public imagePath: string
  public title: string
  public previewImgUrl: string

  public constructor(imagePath: string, title: string, previewImgUrl: string) {
    this.imagePath = imagePath
    this.title = title
    this.previewImgUrl = previewImgUrl
  }
}
