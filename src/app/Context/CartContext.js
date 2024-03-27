"use client";

import { useRouter } from "next/navigation";
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

    const isItemExist = cart?.cartItems?.find(
      (i) => i.name === item.name && i.size === item.size
    );

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.name === isItemExist.name && i.size === isItemExist.size ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = ({ name, size }) => {
    const newCartItems = cart?.cartItems?.filter(
      (i) => !(i.name === name && i.size === size)
    );

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const updateCart = (newCartItems) => {
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCart(newCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        updateCart, // Adding updateCart function to the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
