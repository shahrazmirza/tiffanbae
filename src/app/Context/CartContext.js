"use client";

import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const router = useRouter;

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = async ({ name, size, price, quantity = 1 }) => {
  const item = { name, size, price, quantity };

  const isItemExistIndex = cart?.cartItems?.findIndex(
    (i) => i.name === name && i.size === size
  );

  let newCartItems;

  if (isItemExistIndex !== -1) {
    newCartItems = cart?.cartItems?.map((item, index) =>
      index === isItemExistIndex ? { ...item, quantity: item.quantity + quantity } : item
    );
  } else {
    newCartItems = [...(cart?.cartItems || []), item];
  }

  localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
  setCartToState();
};

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.id !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;