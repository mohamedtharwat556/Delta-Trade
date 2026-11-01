import { Truck } from 'lucide-react'

export default function FreeDeliveryBadge({ threshold = 200, currentTotal }) {
  const remaining = threshold - currentTotal
  const isFree = remaining <= 0

  return (
    <div className={`free-delivery-badge ${isFree ? 'is-free' : ''}`}>
      <Truck size={16} />
      {isFree ? (
        <span>توصيل مجاني!</span>
      ) : (
        <span>اشترِ {remaining} ج.م إضافي للتوصيل المجاني</span>
      )}
    </div>
  )
}
