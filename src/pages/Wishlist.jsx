import { Heart, Trash2 } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCatalog } from '../hooks/useCatalog.js'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function Wishlist() {
  usePageTitle('المفضلة')
  const { wishlist, clearWishlist } = useWishlist()
  const catalog = useCatalog()

  const wishlistProducts = catalog.filter((product) => wishlist.includes(product.id))

  return (
    <>
      <header className='page-header'>
        <div className='page-header__actions'>
          <h1>المفضلة</h1>
          {wishlist.length > 0 && (
            <button
              type='button'
              className='btn btn--ghost btn--sm'
              onClick={clearWishlist}
            >
              <Trash2 size={16} aria-hidden='true' /> مسح الكل
            </button>
          )}
        </div>
        <p className='section__subtitle'>
          {wishlist.length} منتج في المفضلة
        </p>
      </header>

      {wishlistProducts.length === 0 ? (
        <EmptyState
          icon={<Heart size={48} />}
          title='المفضلة فارغة'
          hint='لم تضف أي منتج للمفضلة بعد. تصفح المنتجات وأضف ما يعجبك!'
          action={
            <a href='/products' className='btn btn--primary'>
              تصفح المنتجات
            </a>
          }
        />
      ) : (
        <div className='grid grid--products u-mt-3'>
          {wishlistProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </>
  )
}
