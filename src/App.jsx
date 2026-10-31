import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Splash from './components/layout/Splash.jsx'
import About from './pages/About.jsx'
import CartPage from './pages/CartPage.jsx'
import Categories from './pages/Categories.jsx'
import Checkout from './pages/Checkout.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Invoice from './pages/Invoice.jsx'
import NotFound from './pages/NotFound.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'
import OrderTracking from './pages/OrderTracking.jsx'
import PickList from './pages/PickList.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Products from './pages/Products.jsx'
import Wholesale from './pages/Wholesale.jsx'
import Wishlist from './pages/Wishlist.jsx'

export default function App() {
  return (
    <>
      <Splash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:slug' element={<ProductDetail />} />
          <Route path='categories' element={<Categories />} />
          <Route path='wholesale' element={<Wholesale />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='order/:number' element={<OrderConfirmation />} />
          <Route path='invoice/:number' element={<Invoice />} />
          <Route path='pick/:number' element={<PickList />} />
          <Route path='track' element={<OrderTracking />} />
          <Route path='admin' element={<Dashboard />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
