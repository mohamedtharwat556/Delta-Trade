import { Package } from 'lucide-react'

export default function StockDisplay({ stock, maxStock = 100 }) {
  const percentage = (stock / maxStock) * 100
  const isLow = stock < 10
  const isOut = stock === 0

  return (
    <div className={`stock-display ${isLow ? 'is-low' : ''} ${isOut ? 'is-out' : ''}`}>
      <Package size={14} />
      {isOut ? (
        <span>نفدت الكمية</span>
      ) : isLow ? (
        <span>متبقي {stock} قطع فقط!</span>
      ) : (
        <span>متوفر: {stock} قطعة</span>
      )}
    </div>
  )
}
