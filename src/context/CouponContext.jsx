import { createContext, useContext, useState } from 'react';
import { COUPONS_KEY, DEFAULT_COUPONS } from '../constants/coupons.js';

const CouponContext = createContext(null);

export function CouponProvider({ children }) {
  const [coupons] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(COUPONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return DEFAULT_COUPONS;
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const validateCoupon = (code) => {
    const coupon = coupons[code.toUpperCase()];
    return coupon ? { valid: true, coupon } : { valid: false };
  };

  const applyCoupon = (code) => {
    const validation = validateCoupon(code);
    if (validation.valid) {
      setAppliedCoupon({ code: code.toUpperCase(), ...validation.coupon });
      return { success: true, coupon: validation.coupon };
    }
    return { success: false, error: 'كود الخصم غير صالح' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateDiscount = (subtotal) => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return (subtotal * appliedCoupon.discount) / 100;
    }
    return appliedCoupon.discount;
  };

  return (
    <CouponContext.Provider
      value={{
        coupons,
        appliedCoupon,
        validateCoupon,
        applyCoupon,
        removeCoupon,
        calculateDiscount,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupons() {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupons must be used within CouponProvider');
  }
  return context;
}
