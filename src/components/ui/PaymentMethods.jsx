import { CreditCard, Smartphone, Wallet } from 'lucide-react'

export default function PaymentMethods() {
  return (
    <div className='payment-methods'>
      <h3>طرق الدفع المتاحة</h3>
      <div className='payment-methods__grid'>
        <div className='payment-method'>
          <Smartphone className='payment-method__icon' />
          <h4>فودري (Fawry)</h4>
          <p>ادفع في أي منصة فودري</p>
        </div>
        <div className='payment-method'>
          <Smartphone className='payment-method__icon' />
          <h4>إنستا باي (InstaPay)</h4>
          <p>تحويل فوري عبر إنستا باي</p>
        </div>
        <div className='payment-method'>
          <CreditCard className='payment-method__icon' />
          <h4>بطاقات ائتمان</h4>
          <p>Visa, Mastercard</p>
        </div>
        <div className='payment-method'>
          <Wallet className='payment-method__icon' />
          <h4>الدفع عند الاستلام</h4>
          <p>كاش عند التوصيل</p>
        </div>
      </div>
    </div>
  )
}
