import ProductCard from '../components/product/ProductCard.jsx'
import { useCatalog } from '../hooks/useCatalog.js'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function Featured() {
  const products = useCatalog()
  usePageTitle('منتجات مميزة')

  // منتجات مميزة عشوائية
  const featuredProducts = products
    .filter((p) => p.price && p.stock > 0)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12)

  return (
    <>
      <header className='page-header'>
        <h1>منتجات مميزة</h1>
        <p className='section__subtitle'>اختياراتنا المميزة لك بأفضل الأسعار</p>
      </header>

      <div className='grid grid--products'>
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} featured />
        ))}
      </div>
    </>
  )
}
