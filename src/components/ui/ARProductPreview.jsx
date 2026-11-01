import { useState } from 'react'
import { Box, Scan, Maximize2 } from 'lucide-react'

export default function ARProductPreview({ product }) {
  const [isARActive, setIsARActive] = useState(false)

  const startAR = () => {
    if ('AR' in window) {
      setIsARActive(true)
    } else {
      alert('متصفحك لا يدعم الواقع المعزز')
    }
  }

  return (
    <div className='ar-product-preview'>
      <button className='ar-button' onClick={startAR}>
        <Box size={20} />
        <Scan size={20} />
        <span>معاينة بالواقع المعزز</span>
      </button>

      {isARActive && (
        <div className='ar-viewer'>
          <div className='ar-viewer__header'>
            <h3>معاينة AR</h3>
            <button className='btn--icon' onClick={() => setIsARActive(false)}>
              <Maximize2 size={16} />
            </button>
          </div>
          <div className='ar-viewer__content'>
            <p>انقر هنا للبدء في المسح</p>
            <div className='ar-placeholder'>
              <Scan size={64} />
              <span>امسح الغرفة</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
