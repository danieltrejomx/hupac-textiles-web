'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // unique item id based on productId-color-talla
  productId: string;
  nombre: string;
  estilo: string;
  color: string;
  colorHex: string;
  talla: string;
  cantidad: number;
  precioUnitario: number;
  imagen: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('hupac_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('hupac_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Error saving cart:', e);
      }
    }
  }, [cart, mounted]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const itemId = `${newItem.productId}-${newItem.color}-${newItem.talla}`;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].cantidad += newItem.cantidad;
        return updated;
      } else {
        return [...prevCart, { ...newItem, id: itemId }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
