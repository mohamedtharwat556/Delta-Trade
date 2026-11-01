import { useCatalog } from '../hooks/useCatalog.js'

export default function BrandsPage() {
  const products = useCatalog()
  const brands = [...new Set(products.map(p => p.brand || 'غير محدد'))]

  return (
    <div className='brands-page'>
      <h2>العلامات التجارية</h2>
      <div className='brands-page__grid'>
        {brands.map((brand, index) => (
          <div key={index} className='brand-card'>
            <div className='brand-card__logo'>
              {brand.charAt(0)}
            </div>
            <h3>{brand}</h3>
            <span>{products.filter(p => p.brand === brand).length} منتج</span>
          </div>
        ))}
      </div>
    </div>
  )
}
