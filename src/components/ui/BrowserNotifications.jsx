import { useState } from 'react'
import { Bell, BellOff } from 'lucide-react'

export default function BrowserNotifications() {
  const [enabled, setEnabled] = useState(false)

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      setEnabled(permission === 'granted')
    }
  }

  return (
    <div className='browser-notifications'>
      <button className='btn btn--secondary' onClick={requestPermission}>
        {enabled ? <BellOff /> : <Bell />}
        <span>{enabled ? 'إشعارات مفعلة' : 'تفعيل الإشعارات'}</span>
      </button>
    </div>
  )
}
