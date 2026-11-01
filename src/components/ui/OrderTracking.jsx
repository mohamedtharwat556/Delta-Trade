import { MapPin, Clock, CheckCircle, Package, Truck } from 'lucide-react'

export default function OrderTracking({ orderId }) {
  const orderStatus = [
    { icon: CheckCircle, label: 'تم الطلب', completed: true },
    { icon: Package, label: 'قيد التحضير', completed: true },
    { icon: Truck, label: 'في الطريق', completed: false },
    { icon: MapPin, label: 'تم التوصيل', completed: false },
  ]

  return (
    <div className='order-tracking'>
      <h2>تتبع الطلب #{orderId}</h2>
      
      <div className='order-tracking__timeline'>
        {orderStatus.map((status, index) => (
          <div key={index} className={`order-tracking__step ${status.completed ? 'is-completed' : ''}`}>
            <div className='order-tracking__icon'>
              <status.icon />
            </div>
            <div className='order-tracking__label'>{status.label}</div>
          </div>
        ))}
      </div>

      <div className='order-tracking__info'>
        <div className='order-tracking__item'>
          <Clock size={16} />
          <span>التسليم المتوقع: اليوم 6 مساءً</span>
        </div>
        <div className='order-tracking__item'>
          <MapPin size={16} />
          <span>العنوان: مركز الزرقا، دمياط</span>
        </div>
      </div>
    </div>
  )
}
