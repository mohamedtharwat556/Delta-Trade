import { RotateCcw } from 'lucide-react'

export default function ReorderButton({ order, onReorder }) {
  return (
    <button className='reorder-button' onClick={() => onReorder(order)}>
      <RotateCcw size={16} />
      <span>إعادة الطلب</span>
    </button>
  )
}
