import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ui/ErrorBoundary.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { ReviewsProvider } from './context/ReviewsContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CouponProvider } from './context/CouponContext.jsx'
import { CompareProvider } from './context/CompareContext.jsx'
import { LoyaltyProvider } from './context/LoyaltyContext.jsx'
import './index.css'
import './styles/mobile.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <CartProvider>
          <OrderProvider>
            <ReviewsProvider>
              <WishlistProvider>
                <CouponProvider>
                  <CompareProvider>
                    <LoyaltyProvider>
                      <App />
                    </LoyaltyProvider>
                  </CompareProvider>
                </CouponProvider>
              </WishlistProvider>
            </ReviewsProvider>
          </OrderProvider>
        </CartProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
