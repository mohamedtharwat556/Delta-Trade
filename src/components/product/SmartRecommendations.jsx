import { Link } from 'react-router-dom'
import ProductCard from './ProductCard.jsx'
import { useCatalog } from '../../hooks/useCatalog.js'
import { useCart } from '../../hooks/useCart.js'

export default function SmartRecommendations() {
  const products = useCatalog()
  const { lines } = useCart()

  // الأكثر مبيعاً - عشوائي
  const bestSellers = products
    .filter((p) => p.price && p.stock > 0)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  // جديد - عشوائي
  const newArrivals = products
    .filter((p) => p.price && p.stock > 0)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  // بناءً على مشترياتك
  const cartProductIds = lines.map((line) => line.productId)
  const basedOnPurchases = products
    .filter((p) => p.price && p.stock > 0 && !cartProductIds.includes(p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  return (
    <>
      {basedOnPurchases.length > 0 && lines.length > 0 && (
        <section className='smart-recommendations'>
          <h2 className='smart-recommendations__title'>بناءً على مشترياتك</h2>
          <div className='grid grid--products'>
            {basedOnPurchases.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}

      <section className='smart-recommendations'>
        <h2 className='smart-recommendations__title'>الأكثر مبيعاً</h2>
        <div className='grid grid--products'>
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className='smart-recommendations'>
        <h2 className='smart-recommendations__title'>وصل حديثاً</h2>
        <div className='grid grid--products'>
          {newArrivals.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}
