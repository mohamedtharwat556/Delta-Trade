import { Crown, Trophy, Gem } from 'lucide-react'

export default function VIPCustomers() {
  const customers = [
    { name: 'أحمد محمد', level: 'Gold', points: 5000, icon: Trophy },
    { name: 'سارة أحمد', level: 'Platinum', points: 8000, icon: Gem },
    { name: 'محمد علي', level: 'Gold', points: 4500, icon: Trophy },
  ]

  return (
    <div className='vip-customers'>
      <h2><Crown /> العملاء المميزون (VIP)</h2>
      <div className='vip-customers__grid'>
        {customers.map((customer, index) => (
          <div key={index} className='vip-card'>
            <customer.icon className='vip-card__icon' />
            <h3>{customer.name}</h3>
            <span className='vip-card__level'>{customer.level}</span>
            <span className='vip-card__points'>{customer.points} نقطة</span>
          </div>
        ))}
      </div>
    </div>
  )
}
