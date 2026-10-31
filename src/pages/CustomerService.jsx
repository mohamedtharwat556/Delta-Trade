import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Mail, Truck, RefreshCw, Shield } from 'lucide-react'

export default function CustomerService() {
  return (
    <>
      <header className='page-header'>
        <h1>خدمة العملاء</h1>
        <p className='section__subtitle'>نحن هنا لمساعدتك على مدار الساعة</p>
      </header>

      <div className='customer-service-grid'>
        <div className='customer-service-card'>
          <div className='customer-service-card__icon'>
            <MessageCircle size={32} />
          </div>
          <h3>شات مباشر</h3>
          <p>تواصل معنا عبر الشات المباشر للحصول على إجابة فورية</p>
          <button className='btn btn--primary'>ابدأ الشات</button>
        </div>

        <div className='customer-service-card'>
          <div className='customer-service-card__icon'>
            <Phone size={32} />
          </div>
          <h3>اتصل بنا</h3>
          <p>اتصل بنا على 01000000000 للحصول على المساعدة</p>
          <a href='tel:01000000000' className='btn btn--primary'>
            اتصل الآن
          </a>
        </div>

        <div className='customer-service-card'>
          <div className='customer-service-card__icon'>
            <Mail size={32} />
          </div>
          <h3>البريد الإلكتروني</h3>
          <p>أرسل لنا بريد إلكتروني على delta@trade.com</p>
          <a href='mailto:delta@trade.com' className='btn btn--primary'>
            أرسل بريد
          </a>
        </div>
      </div>

      <section className='section'>
        <h2>سياسات الخدمة</h2>
        <div className='policies-grid'>
          <div className='policy-item'>
            <Truck size={24} />
            <h3>سياسة التوصيل</h3>
            <p>التوصيل مجاني للطلبات أكثر من 200 ج.م</p>
          </div>
          <div className='policy-item'>
            <RefreshCw size={24} />
            <h3>سياسة الإرجاع</h3>
            <p>يمكنك إرجاع المنتجات خلال 14 يوم من الاستلام</p>
          </div>
          <div className='policy-item'>
            <Shield size={24} />
            <h3>ضمان الجودة</h3>
            <p>جميع منتجاتنا مضمونة 100%</p>
          </div>
        </div>
      </section>
    </>
  )
}
