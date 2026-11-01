import { useCart } from '../../hooks/useCart.js'
import { triggerHaptic } from '../../utils/haptic.js'

export default function QuickBuyButton({ product }) {
  const { addLine } = useCart()

  const handleQuickBuy = () => {
    addLine(product, 1)
    triggerHaptic('success')
  }

  return (
    <button className='quick-buy-button' onClick={handleQuickBuy}>
      شراء سريع
    </button>
  )
}
