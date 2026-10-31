import { useState, useEffect } from 'react'
import { Clock, Percent } from 'lucide-react'

export default function FlashSaleBanner({ endDate, discountPercent }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = endDate - now

      if (distance < 0) {
        return { hours: 0, minutes: 0, seconds: 0 }
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      return { hours, minutes, seconds }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  const formatTime = (value) => String(value).padStart(2, '0')

  return (
    <div className='flash-sale-banner'>
      <div className='flash-sale-banner__content'>
        <div className='flash-sale-banner__left'>
          <div className='flash-sale-banner__icon'>
            <Percent size={28} />
          </div>
          <div className='flash-sale-banner__text'>
            <span className='flash-sale-banner__title'>عرض فلاش</span>
            <span className='flash-sale-banner__discount'>خصم {discountPercent}%</span>
          </div>
        </div>
        <div className='flash-sale-banner__timer'>
          <Clock size={20} />
          <div className='flash-sale-banner__time-blocks'>
            <div className='flash-sale-banner__time-block'>
              <span className='flash-sale-banner__time-value'>{formatTime(timeLeft.hours)}</span>
              <span className='flash-sale-banner__time-label'>س</span>
            </div>
            <span className='flash-sale-banner__time-separator'>:</span>
            <div className='flash-sale-banner__time-block'>
              <span className='flash-sale-banner__time-value'>{formatTime(timeLeft.minutes)}</span>
              <span className='flash-sale-banner__time-label'>د</span>
            </div>
            <span className='flash-sale-banner__time-separator'>:</span>
            <div className='flash-sale-banner__time-block'>
              <span className='flash-sale-banner__time-value'>{formatTime(timeLeft.seconds)}</span>
              <span className='flash-sale-banner__time-label'>ث</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
