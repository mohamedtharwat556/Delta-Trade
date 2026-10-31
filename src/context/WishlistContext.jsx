import { createContext, useContext, useState } from 'react';
import { WISHLIST_KEY } from '../constants/wishlist.js';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return [];
  });

  const addToWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev;
      const newWishlist = [...prev, productId];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((id) => id !== productId);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem(WISHLIST_KEY);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
