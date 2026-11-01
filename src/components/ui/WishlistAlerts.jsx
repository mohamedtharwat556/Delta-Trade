import { useState, useEffect } from 'react'

export default function WishlistAlerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const storedAlerts = localStorage.getItem('wishlistAlerts')
    if (storedAlerts) {
      setAlerts(JSON.parse(storedAlerts))
    }
  }, [])

  const dismissAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  if (!alerts.length) return null

  return (
    <div className='wishlist-alerts'>
      {alerts.map((alert) => (
        <div key={alert.id} className='wishlist-alert'>
          <span>{alert.message}</span>
          <button onClick={() => dismissAlert(alert.id)}>×</button>
        </div>
      ))}
    </div>
  )
}
