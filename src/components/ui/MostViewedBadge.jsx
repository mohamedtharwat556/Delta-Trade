import { Eye } from 'lucide-react'

export default function MostViewedBadge({ views }) {
  return (
    <div className='most-viewed-badge'>
      <Eye size={14} />
      <span>{views} مشاهدة</span>
    </div>
  )
}
