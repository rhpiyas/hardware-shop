/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, useCallback, useRef } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const [toast, setToast] = useState(null);
  const bumpTimerRef = useRef(null);
  const toastTimerRef = useRef(null);

  const addItem = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Trigger header list button bounce animation
    setCartBump(true);
    if (bumpTimerRef.current) clearTimeout(bumpTimerRef.current);
    bumpTimerRef.current = setTimeout(() => {
      setCartBump(false);
    }, 700);

    // Trigger floating notification toast
    setToast(product);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const closeToast = useCallback(() => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(null);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      setIsOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      cartBump,
      toast,
      closeToast,
    }}>
      {children}
    </CartContext.Provider>
  );
}
