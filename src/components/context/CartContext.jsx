import React, { createContext, useState, useContext } from "react";

// Create Cart Context
export const CartContext = createContext();

// CartProvider component to wrap around your app and provide cart state
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [categoryname, setCategoryName] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems,categoryname,setCategoryName, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
