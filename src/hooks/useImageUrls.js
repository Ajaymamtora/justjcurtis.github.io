import { useContext } from "react"
import { ImageUrlsContext } from "../context/imageUrlsContext"

export const useImageUrls = () => {
    const images = useContext(ImageUrlsContext) //context is potentially WithImageUrlsContext
    return images
}
