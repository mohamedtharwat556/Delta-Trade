import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'كيف أطلب منتج؟',
      answer: 'أضف المنتج للسلة، ثم اذهب للدفع وأكمل بياناتك.'
    },
    {
      question: 'ما هي طرق الدفع؟',
      answer: 'نقبل فودري، إنستا باي، بطاقات ائتمان، والدفع عند الاستلام.'
    },
    {
      question: 'كم مدة التوصيل؟',
      answer: 'التوصيل خلال 1-3 أيام عمل حسب المحافظة.'
    },
    {
      question: 'هل يمكن إرجاع المنتج؟',
      answer: 'نعم، يمكن الإرجاع خلال 14 يوم من الاستلام.'
    },
    {
      question: 'كيف أتصل بالدعم؟',
      answer: 'تواصل معنا عبر الهاتف 01000000000 أو البريد delta@trade.com'
    }
  ]

  return (
    <div className='faq-page'>
      <h2><HelpCircle /> الأسئلة الشائعة</h2>
      <div className='faq-page__list'>
        {faqs.map((faq, index) => (
          <div key={index} className='faq-item'>
            <button
              className='faq-item__question'
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <div className='faq-item__answer'>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
