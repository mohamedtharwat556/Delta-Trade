import { Link } from 'react-router-dom'
import { X, Scale } from 'lucide-react'
import { useCompare } from '../context/CompareContext.jsx'
import { formatPrice } from '../utils/format.js'

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useCompare()

  if (compareList.length === 0) {
    return (
      <div className='page-header'>
        <h1>مقارنة المنتجات</h1>
        <p className='section__subtitle'>لا توجد منتجات للمقارنة</p>
        <Link to='/products' className='btn btn--primary'>
          تصفح المنتجات
        </Link>
      </div>
    )
  }

  return (
    <>
      <header className='page-header'>
        <h1>مقارنة المنتجات</h1>
        <p className='section__subtitle'>{compareList.length} منتجات للمقارنة</p>
        <button onClick={clearCompare} className='btn btn--ghost btn--sm'>
          مسح الكل
        </button>
      </header>

      <div className='compare-table'>
        <table className='table'>
          <thead>
            <tr>
              <th>المواصفات</th>
              {compareList.map((product) => (
                <th key={product.id}>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className='icon-btn'
                    aria-label='إزالة من المقارنة'
                  >
                    <X size={16} />
                  </button>
                  <div className='compare-product-name'>{product.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>السعر</td>
              {compareList.map((product) => (
                <td key={product.id}>
                  {product.price ? formatPrice(product.price, 'ج.م') : 'غير محدد'}
                </td>
              ))}
            </tr>
            <tr>
              <td>القسم</td>
              {compareList.map((product) => (
                <td key={product.id}>{product.categoryId}</td>
              ))}
            </tr>
            <tr>
              <td>العبوة</td>
              {compareList.map((product) => (
                <td key={product.id}>{product.packSize || 'غير محدد'}</td>
              ))}
            </tr>
            <tr>
              <td>التوفر</td>
              {compareList.map((product) => (
                <td key={product.id}>
                  {product.stock > 0 ? 'متوفر' : 'غير متوفر'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
