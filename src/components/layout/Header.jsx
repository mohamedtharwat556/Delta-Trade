import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, ReceiptText, Search, ShoppingBag, X } from 'lucide-react'
import { company } from '../../data/company.js'
import { navigation } from '../../data/navigation.js'
import { useCart } from '../../hooks/useCart.js'
import brandMark from '../../assets/brand-emblem.png'

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [term, setTerm] = useState('')
  const { summary, openDrawer } = useCart()
  const navigate = useNavigate()

  const submitSearch = (event) => {
    event.preventDefault()
    const query = term.trim()
    navigate(query ? `/products?q=${encodeURIComponent(query)}` : '/products')
    setMenuOpen(false)
  }

  return (
    <header className='site-header'>
      <div className='site-header__topline'>
        <div className='container site-header__topline-inner'>
          <p>{company.tagline}</p>
          <div className='site-header__topline-links'>
            <Link to='/track' className='site-header__track'>
              <ReceiptText size={15} aria-hidden='true' /> تتبع الطلب
            </Link>
          </div>
        </div>
      </div>

      <div className='container site-header__bar'>
        <button
          type='button'
          className='icon-btn nav-toggle'
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to='/' className='brand' onClick={() => setMenuOpen(false)}>
          <img src={brandMark} alt='' width='64' height='30' className='brand__mark' />
          <span className='brand__text'>
            <span className='brand__title'>{company.nameAr}</span>
            <span className='brand__subtitle'>{company.legalName}</span>
          </span>
        </Link>

        <form className='header-search' role='search' onSubmit={submitSearch}>
          <input
            type='search'
            className='header-search__input'
            placeholder='ابحث عن بخور، ولاعة، كبريت…'
            aria-label='البحث في المنتجات'
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
          <button type='submit' className='header-search__btn' aria-label='بحث'>
            <Search size={18} aria-hidden='true' />
          </button>
        </form>

        <button type='button' className='cart-button' onClick={openDrawer} aria-label='فتح سلة المشتريات'>
          <ShoppingBag size={20} aria-hidden='true' />
          <span className='cart-button__label'>السلة</span>
          <span className={`cart-button__count${summary.units ? ' is-active' : ''}`}>{summary.units}</span>
        </button>
      </div>

      <nav
        className={`main-nav${isMenuOpen ? ' is-open' : ''}`}
        aria-label='تنقلات المتجر الرئيسية'
      >
        <div className='container'>
          <ul className='main-nav__list'>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `main-nav__link${isActive ? ' is-active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to='/cart' className='main-nav__link' onClick={() => setMenuOpen(false)}>
                السلة ({summary.lineCount})
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </header>
  )
}
