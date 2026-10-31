import { useState, useEffect } from 'react'
import { Clock, Percent } from 'lucide-react'

export default function FlashSaleBanner({ endDate, discountPercent }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = endDate - now

      if (distance < 0) {
        return 'انتهى العرض'
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      return `${hours}س ${minutes}د ${seconds}ث`
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <div className='flash-sale-banner'>
      <div className='flash-sale-banner__content'>
        <div className='flash-sale-banner__icon'>
          <Percent size={24} />
        </div>
        <div className='flash-sale-banner__text'>
          <span className='flash-sale-banner__title'>عرض فلاش</span>
          <span className='flash-sale-banner__discount'>خصم {discountPercent}%</span>
        </div>
        <div className='flash-sale-banner__timer'>
          <Clock size={20} />
          <span>{timeLeft}</span>
        </div>
      </div>
    </div>
  )
}
