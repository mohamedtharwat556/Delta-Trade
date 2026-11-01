import { useState } from 'react'
import { Sparkles, Palette, Zap, ArrowRight } from 'lucide-react'

export default function AdvancedAnimations() {
  const [active, setActive] = useState(false)

  return (
    <div className='advanced-animations'>
      <button
        className={`btn btn--primary ${active ? 'is-active' : ''}`}
        onClick={() => setActive(!active)}
      >
        <Sparkles />
        <span>{active ? 'إيقاف الأنيميشن' : 'تفعيل الأنيميشن'}</span>
      </button>
      
      {active && (
        <div className='animation-demo'>
          <div className='animation-item fade-in'>
            <Zap size={32} />
            <span>تلاشي</span>
          </div>
          <div className='animation-item slide-up'>
            <Palette size={32} />
            <span>انزلاق</span>
          </div>
          <div className='animation-item bounce'>
            <ArrowRight size={32} />
            <span>ارتداد</span>
          </div>
        </div>
      )}
    </div>
  )
}
