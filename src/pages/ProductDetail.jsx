import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Star } from 'lucide-react'
import AddToCart from '../components/product/AddToCart.jsx'
import Price from '../components/product/Price.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import ProductImage from '../components/ui/ProductImage.jsx'
import StockBadge from '../components/product/StockBadge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ReviewCard from '../components/product/ReviewCard.jsx'
import RelatedProducts from '../components/product/RelatedProducts.jsx'
import {
  categoryChain,
  categoryNeighborhoodIds,
} from '../data/categories.js'
import { company } from '../data/company.js'
import { useCatalog } from '../hooks/useCatalog.js'
import { describePack, formatNumber, formatPrice } from '../utils/format.js'
import { availabilityOf, hasKnownPrice, innerCount } from '../utils/pricing.js'
import { useCart } from '../hooks/useCart.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { useReviews } from '../context/ReviewsContext.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const catalog = useCatalog()
  const product = catalog.find((item) => item.slug === slug) ?? null
  usePageTitle(product?.name ?? 'الصنف غير موجود')
  const [quantity, setQuantity] = useState(1)
  const { lines } = useCart()
  const { getProductReviews, getProductRating, addReview } = useReviews()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({ author: '', comment: '', rating: 5 })

  const reviews = product ? getProductReviews(product.id) : []
  const avgRating = product ? getProductRating(product.id) : 0

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!product) return
    addReview(product.id, reviewForm)
    setReviewForm({ author: '', comment: '', rating: 5 })
    setShowReviewForm(false)
  }

  if (!product) {
    return (
      <>
        <EmptyState
          title='المنتج غير موجود'
          hint='ربما تغيّر الرابط أو أُزيل الصنف من الكتالوج التجريبي.'
          action={
            <Link to='/products' className='btn btn--primary'>
              رجوع إلى المنتجات
            </Link>
          }
        />
      </>
    )
  }

  const chain = categoryChain(product.categoryId)
  const section = chain[0] ?? null
  const availability = availabilityOf(product)
  const priced = hasKnownPrice(product)
  const wholesaleInner = innerCount(product, product.wholesaleMinQuantity)
  const inCart = lines.find((line) => line.product.id === product.id)
  const group = categoryNeighborhoodIds(product.categoryId)
  const related = [
    ...catalog.filter((item) => item.id !== product.id && item.categoryId === product.categoryId),
    ...catalog.filter(
      (item) => item.id !== product.id && item.categoryId !== product.categoryId && group.has(item.categoryId)
    ),
  ].slice(0, 4)

  return (
    <>
      <nav className='breadcrumbs' aria-label='مسار التنقل'>
        <Link to='/'>الرئيسية</Link>
        <ChevronLeft size={14} aria-hidden='true' />
        <Link to='/products'>المنتجات</Link>
        {chain.map((node) => (
          <Fragment key={node.id}>
            <ChevronLeft size={14} aria-hidden='true' />
            <Link to={`/products?category=${node.id}`}>{node.name}</Link>
          </Fragment>
        ))}
        {!chain.length ? (
          <>
            <ChevronLeft size={14} aria-hidden='true' />
            <Link to='/products'>غير مصنّف</Link>
          </>
        ) : null}
        <ChevronLeft size={14} aria-hidden='true' />
        <span>{product.name}</span>
      </nav>

      <div className='detail'>
        <div className='detail__media card'>
          <ProductImage src={product.image} alt={product.name} ratio='square' priority />
          <p className='detail__media-note'>صورة توضيحية تجريبية للصنف</p>
        </div>

        <div className='detail__info'>
          <span className='chip chip--category'>{section?.name ?? 'غير مصنّف'}</span>
          <h1>{product.name}</h1>
          <p className='detail__desc'>{product.description}</p>

          <div className='detail__pricing'>
            <Price product={product} quantity={quantity} size='lg' />
            <p className='detail__unit-note'>
              {product.unit
                ? `${describePack(product)} · تُحسب الكمية بوحدة ${product.unit}`
                : 'وحدة البيع لسه بتُحدَّد'}
            </p>
            <StockBadge product={product} />
            {inCart ? (
              <p className='detail__in-cart'>
                في سلتك بالفعل: {inCart.quantity} {product.unit} — الإضافة تزيد الكمية ولا تكرّر الصنف.
              </p>
            ) : null}
          </div>

          <table className='price-table'>
            <caption>قائمة أسعار تجريبية لهذا الصنف</caption>
            <thead>
              <tr>
                <th scope='col'>نوع البيع</th>
                <th scope='col'>السعر</th>
                <th scope='col'>الشرط</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>قطاعي</th>
                <td>{formatPrice(product.offerPrice ?? product.retailPrice, company.currencyLabel)}</td>
                <td>
                  {!priced
                    ? 'لسه ما اتحدّدش'
                    : product.offerPrice && product.offerPrice < product.retailPrice
                      ? `سعر عرض بدل ${formatPrice(product.retailPrice, company.currencyLabel)}`
                      : 'أي كمية'}
                </td>
              </tr>
              {product.wholesalePrice ? (
                <tr>
                  <th scope='row'>جملة</th>
                  <td>{formatPrice(product.wholesalePrice, company.currencyLabel)}</td>
                  <td>
                    من {formatNumber(product.wholesaleMinQuantity)} {product.unit}
                    {wholesaleInner === null ? null : (
                      <span className='cell-sub'>
                        = {formatNumber(wholesaleInner)} {product.countUnit ?? 'قطعة'}
                      </span>
                    )}
                  </td>
                </tr>
              ) : (
                <tr>
                  <th scope='row'>جملة</th>
                  <td>—</td>
                  <td>
                    {priced
                      ? 'غير متاح لهذا الصنف في البيانات التجريبية'
                      : 'لسه ما اتحدّدش مثل القطاعي'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className='detail__buy'>
            <AddToCart product={product} value={quantity} onQuantityChange={setQuantity} />
          </div>

          <section className='reviews-section'>
            <div className='reviews-section__header'>
              <h2>تقييمات العملاء</h2>
              {avgRating > 0 && (
                <div className='reviews-section__rating'>
                  <Star size={20} className='reviews-section__star' aria-hidden='true' />
                  <span className='reviews-section__avg'>{avgRating}</span>
                  <span className='reviews-section__count'>({reviews.length} تقييم)</span>
                </div>
              )}
            </div>

            {reviews.length > 0 ? (
              <div className='reviews-grid'>
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className='reviews-section__empty'>لا توجد تقييمات بعد. كن أول من يقيّم هذا المنتج!</p>
            )}

            {!showReviewForm ? (
              <button
                type='button'
                className='btn btn--primary'
                onClick={() => setShowReviewForm(true)}
              >
                أضف تقييمك
              </button>
            ) : (
              <form className='review-form' onSubmit={handleSubmitReview}>
                <h3>أضف تقييمك</h3>
                <div className='review-form__field'>
                  <label htmlFor='review-author'>الاسم</label>
                  <input
                    id='review-author'
                    type='text'
                    value={reviewForm.author}
                    onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                    required
                  />
                </div>
                <div className='review-form__field'>
                  <label>التقييم</label>
                  <div className='review-form__rating'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        className={star <= reviewForm.rating ? 'is-selected' : ''}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        aria-label={`${star} نجوم`}
                      >
                        <Star size={20} aria-hidden='true' />
                      </button>
                    ))}
                  </div>
                </div>
                <div className='review-form__field'>
                  <label htmlFor='review-comment'>تعليقك</label>
                  <textarea
                    id='review-comment'
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                  />
                </div>
                <div className='review-form__actions'>
                  <button type='submit' className='btn btn--primary'>
                    إرسال التقييم
                  </button>
                  <button
                    type='button'
                    className='btn btn--ghost'
                    onClick={() => setShowReviewForm(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </section>

          <p className='notice'>
            {company.wholesale.demoNotice}
            {!priced ? ' — سعر هذا الصنف لم يُحدَّد بعد، فلا يُضاف إلى السلة.' : ''}
            {availability.key === 'out' ? ' — الصنف غير متوفر حاليًا ولا يمكن إضافته للسلة.' : ''}
            {availability.key === 'unknown' ? ' — العدد لسه لم يُسجَّل من اللوحة.' : ''}
          </p>
        </div>
      </div>

      {related.length ? (
        <section className='section'>
          <h2>أصناف مشابهة من نفس القسم</h2>
          <div className='grid grid--products u-mt-3'>
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </section>
      ) : null}

      {product ? <RelatedProducts currentProduct={product} /> : null}
    </>
  )
}
