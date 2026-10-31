import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

export default function ProductGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  if (!images || images.length === 0) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className='product-gallery'>
      <div className='product-gallery__main'>
        <button
          className='product-gallery__nav product-gallery__nav--prev'
          onClick={prevImage}
          disabled={images.length === 1}
          aria-label='الصورة السابقة'
        >
          <ChevronRight size={24} />
        </button>
        <div
          className={`product-gallery__image${isZoomed ? ' is-zoomed' : ''}`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img src={images[currentIndex]} alt={`صورة ${currentIndex + 1}`} />
          <div className='product-gallery__zoom-hint'>
            <ZoomIn size={16} />
          </div>
        </div>
        <button
          className='product-gallery__nav product-gallery__nav--next'
          onClick={nextImage}
          disabled={images.length === 1}
          aria-label='الصورة التالية'
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      {images.length > 1 && (
        <div className='product-gallery__thumbnails'>
          {images.map((image, index) => (
            <button
              key={index}
              className={`product-gallery__thumbnail${index === currentIndex ? ' is-active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`صورة ${index + 1}`}
            >
              <img src={image} alt={`صورة مصغرة ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
