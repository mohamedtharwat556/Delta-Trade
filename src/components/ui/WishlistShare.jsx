import { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'

export default function WishlistShare({ wishlist }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = window.location.href + '?wishlist=' + encodeURIComponent(JSON.stringify(wishlist))

  const copyWishlist = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='wishlist-share'>
      <button className='btn btn--secondary' onClick={copyWishlist}>
        <Share2 />
        <span>مشاركة قائمة المفضلة</span>
        {copied ? <Check /> : <Copy />}
      </button>
    </div>
  )
}
