import { createContext, useContext, useState, useEffect } from 'react'

const LoyaltyContext = createContext(null)

const STORAGE_KEY = 'delta-store:loyalty'

export function LoyaltyProvider({ children }) {
  const [points, setPoints] = useState(0)
  const [tier, setTier] = useState('bronze')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      setPoints(data.points || 0)
      setTier(data.tier || 'bronze')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ points, tier }))
  }, [points, tier])

  const addPoints = (amount) => {
    setPoints((prev) => {
      const newPoints = prev + amount
      updateTier(newPoints)
      return newPoints
    })
  }

  const updateTier = (currentPoints) => {
    if (currentPoints >= 1000) setTier('gold')
    else if (currentPoints >= 500) setTier('silver')
    else setTier('bronze')
  }

  const redeemPoints = (pointsToRedeem) => {
    if (points >= pointsToRedeem) {
      setPoints((prev) => prev - pointsToRedeem)
      return true
    }
    return false
  }

  return (
    <LoyaltyContext.Provider
      value={{
        points,
        tier,
        addPoints,
        redeemPoints,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  )
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext)
  if (!context) {
    throw new Error('useLoyalty must be used within LoyaltyProvider')
  }
  return context
}
