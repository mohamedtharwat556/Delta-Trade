import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'

export default function FAQAI() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const askQuestion = () => {
    if (!question.trim()) return
    setAnswer('هذا نظام محاكاة. في الإصدار الحقيقي، سيتم الرد باستخدام AI.')
  }

  return (
    <div className='faq-ai'>
      <h3><MessageCircle /> سؤال ذكي</h3>
      <input
        className='faq-ai__input'
        placeholder='اكتب سؤالك هنا...'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className='btn btn--primary' onClick={askQuestion}>
        <Send />
        <span>اسأل</span>
      </button>
      {answer && <div className='faq-ai__answer'>{answer}</div>}
    </div>
  )
}
