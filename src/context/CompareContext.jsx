import { createContext, useContext, useState, useEffect } from 'react'

const CompareContext = createContext(null)

const STORAGE_KEY = 'delta-store:compare'

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setCompareList(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList))
  }, [compareList])

  const addToCompare = (product) => {
    if (compareList.length >= 4) {
      alert('يمكنك مقارنة 4 منتجات كحد أقصى')
      return
    }
    if (!compareList.find((p) => p.id === product.id)) {
      setCompareList([...compareList, product])
    }
  }

  const removeFromCompare = (productId) => {
    setCompareList(compareList.filter((p) => p.id !== productId))
  }

  const clearCompare = () => {
    setCompareList([])
  }

  const isInCompare = (productId) => {
    return compareList.some((p) => p.id === productId)
  }

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider')
  }
  return context
}
