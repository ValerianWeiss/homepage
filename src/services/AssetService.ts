import Artwork from '@/misc/Artwork'
import Axios from 'axios'

export default class AssetService {
  public static getArtworkDescriptionText(artwork: Artwork) {
    return Axios.get(artwork.descriptionTextUrl)
  }
}
