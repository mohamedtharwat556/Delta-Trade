import { useCatalog } from '../../hooks/useCatalog.js'

export default function FeaturedToday() {
  const products = useCatalog()
  const featured = products.sort(() => Math.random() - 0.5).slice(0, 8)

  return (
    <div className='featured-today'>
      <h2>منتجات مميزة اليوم</h2>
      <p className='featured-today__subtitle'>أفضل العروض لهذا اليوم</p>
      <div className='grid grid--products'>
        {featured.map((product, index) => (
          <div key={product.id} className='product-card'>
            <div className='today-badge'>مميز اليوم</div>
            {/* Product card content */}
          </div>
        ))}
      </div>
    </div>
  )
}
