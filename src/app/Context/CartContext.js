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

  const addItemToCart = async ({ name, price, quantity = 1 }) => {
    const item = { name, price, quantity };

    const isItemExist = cart?.cartItems?.find((i) => i.name === item.name);

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.name === isItemExist.name ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.name !== id);

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

// "use client";

// import { useRouter } from "next/navigation";
// import { createContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const router = useRouter;

//   useEffect(() => {
//     setCartToState();
//   }, []);

//   const setCartToState = () => {
//     setCart(
//       localStorage.getItem("cart")
//         ? JSON.parse(localStorage.getItem("cart"))
//         : []
//     );
//   };

//   const addItemToCart = async ({ name, size, price, quantity = 1 }) => {
//     const item = { name, size, price, quantity };
  
//     const isItemExist = cart?.cartItems?.find((i) => i.name === item.name && i.size === item.size);
  
//     let newCartItems;
  
//     if (isItemExist) {
//       newCartItems = cart?.cartItems?.map((i) =>
//       i.name === item.name && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i
//       );
//     } else {
//       newCartItems = [...(cart?.cartItems || []), item];
//     }
  
//     localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
//     setCartToState();
//   };

//   const deleteItemFromCart = ({ name, size }) => {
//     const newCartItems = cart?.cartItems?.filter((item) => !(item.name === name && item.size === size));
  
//     localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
//     setCartToState();
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addItemToCart,
//         deleteItemFromCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartContext;