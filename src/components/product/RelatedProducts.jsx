import { Link } from 'react-router-dom'
import ProductCard from './ProductCard.jsx'
import { useCatalog } from '../../hooks/useCatalog.js'

export default function RelatedProducts({ currentProduct, title = 'قد يعجبك أيضاً' }) {
  const products = useCatalog()

  // منطق لتحديد المنتجات المشابهة
  const relatedProducts = products
    .filter((product) => {
      // نفس القسم
      if (product.categoryId === currentProduct.categoryId && product.id !== currentProduct.id) {
        return true
      }
      // نفس نطاق السعر تقريباً
      if (product.price && currentProduct.price) {
        const priceDiff = Math.abs(product.price - currentProduct.price)
        if (priceDiff <= 50 && product.id !== currentProduct.id) {
          return true
        }
      }
      return false
    })
    .slice(0, 4) // عرض 4 منتجات فقط

  if (relatedProducts.length === 0) return null

  return (
    <section className='related-products'>
      <h2 className='related-products__title'>{title}</h2>
      <div className='grid grid--products'>
        {relatedProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}
