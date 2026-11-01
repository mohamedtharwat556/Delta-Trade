export function sendOrderConfirmationEmail(order) {
  // محاكاة إرسال إيميل تأكيد الطلب
  console.log('Sending order confirmation email:', order)
  return { success: true, message: 'تم إرسال إيميل التأكيد' }
}

export function sendPromotionalEmail(customerEmail, offer) {
  // محاكاة إرسال إيميل ترويجي
  console.log('Sending promotional email to:', customerEmail, 'Offer:', offer)
  return { success: true, message: 'تم إرسال الإيميل الترويجي' }
}

export function sendNewsletterEmail(subscribers, content) {
  // محاكاة إرسال نشرة إخبارية
  console.log('Sending newsletter to:', subscribers.length, 'subscribers')
  return { success: true, message: 'تم إرسال النشرة' }
}
