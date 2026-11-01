import { useState } from 'react'
import { Bot, Send, User, MessageSquare } from 'lucide-react'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟' }
  ])
  const [input, setInput] = useState('')

  const responses = {
    'شحن': 'التوصيل خلال 1-3 أيام عمل حسب المحافظة',
    'سعر': 'الأسعار تختلف حسب المنتج والكمية',
    'استرجاع': 'يمكنك إرجاع المنتج خلال 14 يوم',
    'عروض': 'تحقق من صفحة العروض للحصول على أحدث الخصومات',
    'تواصل': 'تواصل معنا على 01000000000 أو delta@trade.com',
  }

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', text: input }
    setMessages([...messages, userMessage])

    // Simple keyword matching for demo
    let response = 'شكراً لتواصلك معنا! كيف يمكنني مساعدتك؟'
    for (const [keyword, answer] of Object.entries(responses)) {
      if (input.includes(keyword)) {
        response = answer
        break
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: response }])
    }, 500)

    setInput('')
  }

  return (
    <div className='ai-chatbot'>
      {!isOpen && (
        <button className='chatbot-toggle' onClick={() => setIsOpen(true)}>
          <Bot size={24} />
        </button>
      )}

      {isOpen && (
        <div className='chatbot-window'>
          <div className='chatbot-header'>
            <h3><Bot /> المساعد الذكي</h3>
            <button className='btn--icon' onClick={() => setIsOpen(false)}>
              <MessageSquare size={16} />
            </button>
          </div>

          <div className='chatbot-messages'>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.role === 'bot' && <Bot size={16} />}
                {msg.role === 'user' && <User size={16} />}
                <span>{msg.text}</span>
              </div>
            ))}
          </div>

          <div className='chatbot-input'>
            <input
              type='text'
              placeholder='اكتب رسالتك...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className='btn--icon' onClick={sendMessage}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
