import ProductCard from '../components/product/ProductCard.jsx'
import { useCatalog } from '../hooks/useCatalog.js'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function SpecialOffers() {
  const products = useCatalog()
  usePageTitle('عروض خاصة')

  // منتجات بخصومات عشوائية
  const offerProducts = products
    .filter((p) => p.price && p.stock > 0)
    .sort(() => Math.random() - 0.5)
    .slice(0, 8)

  return (
    <>
      <header className='page-header'>
        <h1>عروض خاصة</h1>
        <p className='section__subtitle'>خصومات حصرية لفترة محدودة</p>
      </header>

      <div className='offers-banner'>
        <div className='offers-banner__content'>
          <h2>خصم 50% على جميع المنتجات</h2>
          <p>استخدم كود: DELTA50</p>
        </div>
      </div>

      <div className='grid grid--products'>
        {offerProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} offer />
        ))}
      </div>
    </>
  )
}
