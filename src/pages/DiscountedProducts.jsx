import { useCatalog } from '../../hooks/useCatalog.js'

export default function DiscountedProducts() {
  const products = useCatalog()
  const discounted = products.filter(p => p.offerPrice)

  return (
    <div className='discounted-products'>
      <h2>المنتجات المخفضة</h2>
      <div className='grid grid--products'>
        {discounted.map((product, index) => (
          <div key={product.id} className='product-card'>
            <div className='discount-badge'>خصم {Math.round((1 - product.offerPrice / product.price) * 100)}%</div>
            {/* Product card content */}
          </div>
        ))}
      </div>
    </div>
  )
}
