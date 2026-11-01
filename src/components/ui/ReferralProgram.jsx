import { useState } from 'react'
import { Users, Copy, Check, Gift } from 'lucide-react'

export default function ReferralProgram() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'DELTA-REF-2024'

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='referral-program'>
      <h2><Users /> برنامج الإحالة</h2>
      <p className='referral-program__desc'>ادع أصدقاءك واحصل على مكافآت!</p>

      <div className='referral-code' onClick={copyCode}>
        {referralCode}
        {copied ? <Check /> : <Copy />}
      </div>

      <div className='referral-stats'>
        <div className='referral-stat'>
          <strong>12</strong>
          <span>عدد الدعوات</span>
        </div>
        <div className='referral-stat'>
          <strong>5</strong>
          <span>تم التسجيل</span>
        </div>
        <div className='referral-stat'>
          <strong>150</strong>
          <span>النقاط المكتسبة</span>
        </div>
        <div className='referral-stat'>
          <strong>30</strong>
          <span>ج.م المكافآت</span>
        </div>
      </div>

      <div className='referral-info'>
        <h3><Gift /> كيف يعمل؟</h3>
        <ol>
          <li>شارك كود الإحالة مع أصدقائك</li>
          <li>عندما يسجلون، يحصلون على خصم 10%</li>
          <li>أنت تحصل على 30 ج.م لكل تسجيل</li>
        </ol>
      </div>
    </div>
  )
}
