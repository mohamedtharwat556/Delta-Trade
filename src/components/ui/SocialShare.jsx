import { useState } from 'react'
import { Share2, Facebook, Twitter, Whatsapp, Link as LinkIcon } from 'lucide-react'

export default function SocialShare({ product }) {
  const [copied, setCopied] = useState(false)
  const url = window.location.href
  const text = `أفضل منتج: ${product.name} - ${product.price} ج.م`

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
  }

  const shareOnWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='social-share'>
      <button className='social-share__button' onClick={shareOnFacebook} title='مشاركة على فيسبوك'>
        <Facebook />
      </button>
      <button className='social-share__button' onClick={shareOnTwitter} title='مشاركة على تويتر'>
        <Twitter />
      </button>
      <button className='social-share__button' onClick={shareOnWhatsapp} title='مشاركة على واتساب'>
        <Whatsapp />
      </button>
      <button className='social-share__button' onClick={copyLink} title='نسخ الرابط'>
        {copied ? <span>تم النسخ!</span> : <LinkIcon />}
      </button>
    </div>
  )
}
