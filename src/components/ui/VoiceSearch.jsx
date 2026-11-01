import { useState } from 'react'
import { Mic, MicOff } from 'lucide-react'

export default function VoiceSearch({ onSearch }) {
  const [isListening, setIsListening] = useState(false)

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = 'ar-SA'
      recognition.continuous = false

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        onSearch(transcript)
      }

      recognition.start()
    } else {
      alert('متصفحك لا يدعم البحث الصوتي')
    }
  }

  return (
    <button
      className='voice-search-btn'
      onClick={startListening}
      title='بحث صوتي'
    >
      {isListening ? <MicOff /> : <Mic />}
    </button>
  )
}
