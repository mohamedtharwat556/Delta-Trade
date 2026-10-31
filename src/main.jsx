import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ui/ErrorBoundary.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ReviewsProvider } from './context/ReviewsContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CouponProvider } from './context/CouponContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <CartProvider>
            <OrderProvider>
              <ReviewsProvider>
                <WishlistProvider>
                  <CouponProvider>
                    <AuthProvider>
                      <App />
                    </AuthProvider>
                  </CouponProvider>
                </WishlistProvider>
              </ReviewsProvider>
            </OrderProvider>
          </CartProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
