import { afterEach } from 'vitest'

// كل اختبار يبدأ بمخزن محلي نظيف
afterEach(() => {
  localStorage.clear()
})
