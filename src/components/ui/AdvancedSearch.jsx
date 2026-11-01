import { useState } from 'react'
import { Filter, SlidersHorizontal, X } from 'lucide-react'

export default function AdvancedSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    category: '',
    rating: 0,
    inStock: false,
  })

  const applyFilters = () => {
    onSearch(filters)
  }

  const clearFilters = () => {
    setFilters({ priceRange: [0, 1000], category: '', rating: 0, inStock: false })
  }

  return (
    <div className='advanced-search'>
      <div className='advanced-search__header'>
        <h3><Filter /> بحث متقدم</h3>
        <button className='btn--icon' onClick={clearFilters}>
          <X size={16} />
        </button>
      </div>

      <div className='advanced-search__filters'>
        <div className='filter-group'>
          <label>نطاق السعر:</label>
          <div className='price-range'>
            <input
              type='number'
              value={filters.priceRange[0]}
              onChange={(e) => setFilters({ ...filters, priceRange: [parseInt(e.target.value), filters.priceRange[1]] })}
            />
            <span>-</span>
            <input
              type='number'
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
            />
          </div>
        </div>

        <div className='filter-group'>
          <label>التقييم:</label>
          <select
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: parseInt(e.target.value) })}
          >
            <option value={0}>الكل</option>
            <option value={3}>3 نجوم فأكثر</option>
            <option value={4}>4 نجوم فأكثر</option>
            <option value={5}>5 نجوم</option>
          </select>
        </div>

        <div className='filter-group'>
          <label>
            <input
              type='checkbox'
              checked={filters.inStock}
              onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
            />
            متوفر فقط
          </label>
        </div>
      </div>

      <button className='btn btn--primary' onClick={applyFilters}>
        <SlidersHorizontal />
        <span>تطبيق الفلاتر</span>
      </button>
    </div>
  )
}
