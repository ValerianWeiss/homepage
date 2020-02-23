export default class Artwork {
  private path: string
  public title: string
  public previewImgPath: string
  public imagePaths: string[]

  public constructor(path: string, title: string, imageCount: number) {
    this.path = '/artworks/' + path
    this.title = title
    this.previewImgPath = this.path + '/preview.png'
    this.imagePaths = []
    this.initImagePaths(imageCount)
  }

  public initImagePaths(imageCount: number): void {
    const prefix = '/image'

    for (let i = 0; i < imageCount; i++) {
      let suffix = i.toString().padStart(2, '0')
      let imagePath = this.path + prefix + suffix + '.png'
      this.imagePaths.push(imagePath)
    }
  }
}
