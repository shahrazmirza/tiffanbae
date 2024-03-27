'use client'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useContext } from 'react';
import CartContext from '../Context/CartContext';

const SuccessPage = () => {
  const { updateCart } = useContext(CartContext);

  const clearCart = () => {
    updateCart([]); 
  };

  React.useEffect(() => {
    clearCart();
  }, []); // Empty dependency array ensures the effect runs only once after component mounts

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-10 shadow-md flex flex-col items-center">
        <p className="text-base/relaxed font-medium drop-shadow-sm mb-6">
          Thank You! Your order has been placed successfully
        </p>
        <Link href="/Menu">
          <Button className="px-6 text-sm font-medium leading-none border-gray-700 border-solid border rounded text-white hover:text-gray-700 h-10 hover:bg-white bg-gray-700">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
