import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, Search, SlidersHorizontal, Tag, X } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { categoryChain, categoryGroupIds, findCategory, sectionCount, subCategories, topCategories } from '../data/categories.js'
import { company } from '../data/company.js'
import { useCatalog } from '../hooks/useCatalog.js'
import { SORT_OPTIONS, useCatalogQuery } from '../hooks/useCatalogQuery.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { priceForQuantity } from '../utils/pricing.js'
import { formatPrice } from '../utils/format.js'

const TAG_OPTIONS = [
  { id: '', label: 'الكل' },
  { id: 'best-seller', label: 'الأكثر طلبًا' },
  { id: 'offer', label: 'عروض' },
]

const PRICE_RANGES = [
  { id: '', label: 'كل الأسعار' },
  { id: '0-50', label: 'أقل من 50 ج.م' },
  { id: '50-100', label: '50 - 100 ج.م' },
  { id: '100-200', label: '100 - 200 ج.م' },
  { id: '200+', label: 'أكثر من 200 ج.م' },
]

// عرض الأقسام كدوائر مع صور
function CategoryCircle({ node, isSelected, count, onPick }) {
  return (
    <button
      type='button'
      className={`category-circle${isSelected ? ' is-active' : ''}`}
      onClick={() => onPick(node.id)}
      aria-pressed={isSelected}
      title={`${node.name} - ${count.value} ${count.unit}`}
    >
      <div className='category-circle__image'>
        {node.image ? (
          <img src={node.image} alt={node.name} className='category-circle__img' />
        ) : (
          <div className='category-circle__placeholder'>
            <span className='category-circle__count'>{count.value}</span>
          </div>
        )}
      </div>
      <span className='category-circle__name'>{node.name}</span>
      <span className='category-circle__count-text'>{count.value} صنف</span>
    </button>
  )
}

export default function Products() {
  const catalog = useCatalogQuery()
  const products = useCatalog()
  const activeCategory = findCategory(catalog.categoryId)
  usePageTitle(activeCategory ? activeCategory.name : 'المنتجات')
  const sections = topCategories()
  const [priceRange, setPriceRange] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const resetFilters = () => {
    catalog.reset()
    setPriceRange('')
  }
  const activeFilterCount = [
    catalog.categoryId,
    catalog.tag,
    catalog.min,
    catalog.max,
    catalog.inStock ? 'in-stock' : '',
    catalog.query.trim(),
    priceRange,
  ].filter(Boolean).length
  const countByGroup = (id) => {
    const group = categoryGroupIds(id)
    return sectionCount(id, products.filter((product) => group.has(product.categoryId)).length)
  }

  const countByCategory = (id) => {
    return sectionCount(id, products.filter((product) => product.categoryId === id).length)
  }
  const countByTag = (id) => products.filter((product) => product.tags.includes(id)).length
  const sellingPrices = products.map((product) => priceForQuantity(product, 1).unit).filter((value) => value !== null)
  const priceSpan = sellingPrices.length
    ? { low: Math.min(...sellingPrices), high: Math.max(...sellingPrices) }
    : null

  const handlePriceRange = (range) => {
    setPriceRange(range)
    if (range === '') {
      catalog.setMin(null)
      catalog.setMax(null)
    } else if (range === '0-50') {
      catalog.setMin(0)
      catalog.setMax(50)
    } else if (range === '50-100') {
      catalog.setMin(50)
      catalog.setMax(100)
    } else if (range === '100-200') {
      catalog.setMin(100)
      catalog.setMax(200)
    } else if (range === '200+') {
      catalog.setMin(200)
      catalog.setMax(null)
    }
  }

  // التحقق من القسم الحالي وأقسامه الفرعية
  const currentSubCategories = activeCategory ? subCategories(activeCategory.id) : []
  const hasSubCategories = currentSubCategories.length > 0

  return (
    <>
      <header className='page-header'>
        <h1>المنتجات</h1>
        <p className='section__subtitle' aria-live='polite'>
          {activeCategory ? activeCategory.name : 'كل الأقسام'} — {catalog.results.length} من{' '}
          {products.length} صنف
        </p>
      </header>

      {/* وصف ترحيبي */}
      {!catalog.categoryId && (
        <div className='page-intro'>
          <p className='page-intro__text'>
            اكتشف تشكيلة واسعة من الخردوات والمنتجات الاستهلاكية في دلتا. اختر القسم الذي يناسبك وابدأ التسوق.
          </p>
        </div>
      )}

      {/* عرض الأقسام الرئيسية كدوائر */}
      {!catalog.categoryId && (
        <div className='categories-circles'>
          {sections.map((category) => (
            <CategoryCircle
              key={category.id}
              node={category}
              isSelected={catalog.categoryId === category.id}
              count={countByGroup(category.id)}
              onPick={(id) => catalog.setCategory(id)}
            />
          ))}
        </div>
      )}

      {/* عرض الأقسام الفرعية */}
      {catalog.categoryId && hasSubCategories && (
        <>
          <div className='catalog-toolbar'>
            <button
              type='button'
              className='btn btn--ghost btn--sm'
              onClick={() => catalog.setCategory('')}
            >
              العودة للأقسام الرئيسية
            </button>
            <span className='catalog-toolbar__count'>
              {currentSubCategories.length} قسم فرعي
            </span>
          </div>

          <div className='categories-circles'>
            {currentSubCategories.map((category) => (
              <CategoryCircle
                key={category.id}
                node={category}
                isSelected={catalog.categoryId === category.id}
                count={countByCategory(category.id)}
                onPick={(id) => catalog.setCategory(id)}
              />
            ))}
          </div>
        </>
      )}

      {/* عرض المنتجات داخل القسم المختار (بدون أقسام فرعية) */}
      {catalog.categoryId && !hasSubCategories && (
        <>
          <div className='catalog-toolbar'>
            <button
              type='button'
              className='btn btn--ghost btn--sm'
              onClick={() => {
                // العودة للقسم الرئيسي إذا كان هناك قسم رئيسي
                if (activeCategory.parent) {
                  catalog.setCategory(activeCategory.parent)
                } else {
                  catalog.setCategory('')
                }
              }}
            >
              العودة للأقسام
            </button>
            <span className='catalog-toolbar__count'>
              {catalog.results.length} من {products.length} صنف
            </span>
          </div>

          <div className='catalog-toolbar'>
            <button
              type='button'
              className='btn btn--ghost btn--sm catalog-toolbar__filters'
              aria-expanded={filtersOpen}
              aria-controls='catalog-filters'
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <SlidersHorizontal size={16} aria-hidden='true' /> الفلاتر
              {activeFilterCount ? (
                <span className='catalog-toolbar__badge'>{activeFilterCount}</span>
              ) : null}
            </button>
            <label className='visually-hidden' htmlFor='catalog-sort-compact'>
              الترتيب
            </label>
            <select
              id='catalog-sort-compact'
              className='field field--select catalog-toolbar__sort'
              value={catalog.sort}
              onChange={(event) => catalog.setSort(event.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='catalog-layout'>
            <aside
              id='catalog-filters'
              className={`card filter-panel${filtersOpen ? '' : ' is-collapsed'}`}
              aria-label='أدوات التصفية'
            >
              <div className='filter-panel__head'>
                <h2 className='filter-panel__title'>الفلاتر</h2>
                <button
                  type='button'
                  className='icon-btn'
                  onClick={() => setFiltersOpen(false)}
                  aria-label='إغلاق الفلاتر'
                >
                  <X size={20} aria-hidden='true' />
                </button>
              </div>

              <div className='filter-panel__search'>
                <label className='field-label' htmlFor='catalog-search'>
                  <Search size={16} aria-hidden='true' /> ابحث بالاسم أو الوصف أو رمز الصنف
                </label>
                <input
                  id='catalog-search'
                  className='field'
                  type='search'
                  value={catalog.query}
                  placeholder='مثال: بخور، ولاعة، كبريت، فحم'
                  onChange={(event) => catalog.setQuery(event.target.value)}
                />
              </div>

              <fieldset className='filter-panel__group'>
                <legend className='field-label'>التصفية السريعة</legend>
                <div className='filter-list'>
                  {TAG_OPTIONS.map((option) => (
                    <button
                      key={option.id || 'all'}
                      type='button'
                      className={`filter-option${option.id === catalog.tag ? ' is-active' : ''}`}
                      onClick={() => {
                        catalog.setTag(option.id === catalog.tag ? '' : option.id)
                      }}
                      aria-pressed={option.id === catalog.tag}
                    >
                      <span>{option.label}</span>
                      {option.id ? <span className='filter-option__count'>{countByTag(option.id)}</span> : null}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className='filter-panel__group'>
                <legend className='field-label'>
                  <Tag size={16} aria-hidden='true' /> نطاق السعر
                </legend>
                <div className='filter-list'>
                  {PRICE_RANGES.map((option) => (
                    <button
                      key={option.id || 'all'}
                      type='button'
                      className={`filter-option${option.id === priceRange ? ' is-active' : ''}`}
                      onClick={() => {
                        handlePriceRange(option.id === priceRange ? '' : option.id)
                      }}
                      aria-pressed={option.id === priceRange}
                    >
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className='filter-panel__group'>
                <legend className='field-label'>السعر المخصص</legend>
                <p className='filter-price__span'>
                  {priceSpan
                    ? `في الكتالوج ${formatPrice(priceSpan.low, company.currencyLabel)} – ${formatPrice(
                        priceSpan.high,
                        company.currencyLabel
                      )}`
                    : 'كل أصناف الكتالوج لسه بلا أسعار'}
                </p>
                <div className='filter-price'>
                  <label className='visually-hidden' htmlFor='catalog-min-price'>
                    أقل سعر
                  </label>
                  <input
                    id='catalog-min-price'
                    className='field'
                    type='number'
                    inputMode='numeric'
                    min='0'
                    step='1'
                    placeholder='من'
                    value={catalog.min}
                    onChange={(event) => catalog.setMin(event.target.value)}
                  />
                  <span className='filter-price__dash' aria-hidden='true'>
                    —
                  </span>
                  <label className='visually-hidden' htmlFor='catalog-max-price'>
                    أعلى سعر
                  </label>
                  <input
                    id='catalog-max-price'
                    className='field'
                    type='number'
                    inputMode='numeric'
                    min='0'
                    step='1'
                    placeholder='إلى'
                    value={catalog.max}
                    onChange={(event) => catalog.setMax(event.target.value)}
                  />
                </div>
                <label className='filter-check'>
                  <input
                    type='checkbox'
                    checked={catalog.inStock}
                    onChange={(event) => catalog.setInStock(event.target.checked)}
                  />
                  المتوفر فقط
                </label>
              </fieldset>

              <div className='filter-panel__foot'>
                <div className='filter-panel__sort'>
                  <label className='field-label' htmlFor='catalog-sort'>
                    الترتيب
                  </label>
                  <select
                    id='catalog-sort'
                    className='field field--select'
                    value={catalog.sort}
                    onChange={(event) => catalog.setSort(event.target.value)}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {catalog.hasFilters ? (
                  <button type='button' className='btn btn--ghost btn--sm btn--block' onClick={resetFilters}>
                    <RotateCcw size={15} aria-hidden='true' /> إزالة الفلاتر
                  </button>
                ) : null}
              </div>
            </aside>

            <div className='catalog-main'>
              {catalog.results.length ? (
                <div className='grid grid--products'>
                  {catalog.results.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title='لا نتائج مطابقة'
                  hint='جرّب كلمة أقل، أو أزل الفلاتر لعرض كل الأصناف.'
                  action={
                    <div className='btn-row'>
                      <button type='button' className='btn btn--primary' onClick={resetFilters}>
                        <RotateCcw size={16} aria-hidden='true' /> إزالة الفلاتر
                      </button>
                      <Link to='/products' className='btn btn--ghost'>
                        كل المنتجات
                      </Link>
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
