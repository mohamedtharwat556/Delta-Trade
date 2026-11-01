import { useState } from 'react'
import { Palette, Sun, Moon, Contrast } from 'lucide-react'

export default function CustomizableTheme() {
  const [theme, setTheme] = useState('light')
  const [primaryColor, setPrimaryColor] = useState('#0b2440')

  const themes = [
    { id: 'light', icon: Sun, label: 'فاتح' },
    { id: 'dark', icon: Moon, label: 'داكن' },
    { id: 'high-contrast', icon: Contrast, label: 'تباين عالي' },
  ]

  return (
    <div className='customizable-theme'>
      <h3><Palette /> تخصيص المظهر</h3>
      
      <div className='theme-selector'>
        {themes.map((t) => (
          <button
            key={t.id}
            className={`theme-btn ${theme === t.id ? 'is-active' : ''}`}
            onClick={() => setTheme(t.id)}
          >
            <t.icon size={20} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className='color-picker'>
        <label>اللون الأساسي:</label>
        <input
          type='color'
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </div>
    </div>
  )
}
