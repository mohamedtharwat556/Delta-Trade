import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone, ShieldAlert } from 'lucide-react'
import { company } from '../data/company.js'
import { usePageTitle } from '../hooks/usePageTitle.js'

const channels = [
  { icon: Phone, label: 'الهاتف', value: company.contact.phone },
  { icon: Mail, label: 'البريد الإلكتروني', value: company.contact.email },
  { icon: MapPin, label: 'العنوان', value: company.contact.address },
  { icon: Clock, label: 'مواعيد العمل', value: company.contact.hours },
]

export default function Contact() {
  usePageTitle('تواصل معنا')
  return (
    <>
      <header className='page-header'>
        <h1>تواصل معنا</h1>
        <p className='section__subtitle'>{company.legalName}</p>
      </header>

      <section className='card'>
        <h2>قنوات التواصل</h2>
        <div className='contact-list u-mt-3'>
          {channels.map((channel) => (
            <div key={channel.label} className='contact-item'>
              <span className='contact-item__icon'>
                <channel.icon size={18} aria-hidden='true' />
              </span>
              <span>
                <strong>{channel.label}</strong>
                <span className={`contact-item__value${channel.value ? '' : ' is-pending'}`}>
                  {channel.value ?? 'لم تُعتمد بعد'}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <p className='checkout-blocked'>
        <ShieldAlert size={16} aria-hidden='true' />
        عنوان المخزن معتمد من الشركة ومذكور أعلاه، أما الهاتف والبريد ومواعيد العمل فلم تُعتمد بعد
        فلا تُدرج في الواجهة. عند اعتمادها تُضاف في <code>src/data/company.js</code> وتظهر تلقائيًا
        هنا وفي الفوتر والفاتورة.
      </p>

      <section className='card u-mt-4'>
        <h2>كيف تطلب كميات الآن؟</h2>
        <p className='section__subtitle u-mt-2'>
          جهّز أصنافك في السلة، ثم انسخ ملخص الطلب من صفحة إتمام الطلب كمسودة جاهزة للإرسال يدويًا بعد
          اعتماد قناة التواصل.
        </p>
        <div className='btn-row u-mt-4'>
          <Link to='/cart' className='btn btn--primary'>
            فتح سلة المشتريات
          </Link>
          <Link to='/checkout' className='btn btn--ghost'>
            صفحة إتمام الطلب
          </Link>
          <Link to='/wholesale' className='btn btn--ghost'>
            شروط الجملة
          </Link>
        </div>
      </section>
    </>
  )
}
