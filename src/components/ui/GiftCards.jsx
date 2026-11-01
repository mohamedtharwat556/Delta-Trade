import { useState } from 'react'
import { Gift, Copy, Check } from 'lucide-react'

export default function GiftCards() {
  const [copied, setCopied] = useState(false)
  const giftCode = 'DELTA-GIFT-2024'

  const copyCode = () => {
    navigator.clipboard.writeText(giftCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='gift-cards'>
      <h2>بطاقات الهدايا</h2>
      <p className='gift-cards__desc'>أهدي بطاقة هدايا لأحبائك!</p>
      
      <div className='gift-cards__grid'>
        {[100, 200, 500, 1000].map((amount) => (
          <div key={amount} className='gift-card'>
            <Gift className='gift-card__icon' />
            <h3>{amount} ج.م</h3>
            <button className='btn btn--primary'>شراء</button>
          </div>
        ))}
      </div>

      <div className='gift-cards__code'>
        <label>كود بطاقة هدايا:</label>
        <div className='referral-code' onClick={copyCode}>
          {giftCode}
          {copied ? <Check /> : <Copy />}
        </div>
      </div>
    </div>
  )
}
