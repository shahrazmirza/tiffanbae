'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useSession, signIn } from "next-auth/react";
import { Button, Container } from '@radix-ui/themes';
import data from '../Data/Products.json';
import CartContext from '../Context/CartContext';
import { HiOutlineShoppingCart } from 'react-icons/hi';

const Products = ({ }) => {
  const [items, setItems] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    console.log('', data);
    if (data && data.length > 0) {
      setItems(data);
    } else {
      console.error('');
    }
  }, []);

  const { addItemToCart } = useContext(CartContext);

  const handleAddToCart = (item) => {
    if (session) {
      addItemToCart({
        name: item.name,
        price: item.price,
      });
    } else {
      signIn();
    }
  };

  return (
    <Container>
      <div className='grid py-10'>
        <p className='font-heading2 uppercase font-bold text-4xl text-neutral-700 border-zinc-300 py-10 text-center'>
          MUTTON CORNER
        </p>
        <ul className='grid grid-cols-2 gap-14 pt-10 '>
        {items.filter(item => item.category === 'Mutton').map((item) => (
            <li>
              <div className='border p-5'>
                <div className='flex justify-between'>
                  <p className='font-medium text-lg font-heading2 uppercase text-neutral-600'>
                    {item.name}
                  </p>
                  <p className='font-bold text-xl font-heading2 uppercase text-neutral-600'>
                  ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-base font-normal text-neutral-600 pt-5'>
                    {item.description}
                  </p>
                  <div></div>
                </div>
                <div className='flex justify-between'>
                  <div></div>
                  <Button
                    onClick={() => handleAddToCart(item)} 
                    className='flex items-center justify-center p-3 mt-5 text-sm leading-none text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 cursor-pointer'>
                    <HiOutlineShoppingCart />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='grid py-10'>
        <p className='font-heading2 uppercase font-bold text-4xl text-neutral-700 border-zinc-300 py-10 text-center'>CHICKEN CORNER</p>
        <ul className='grid grid-cols-2 gap-14 pt-10'>
        {items.filter(item => item.category === 'Chicken').map((item) => (
            <li>
              <div className='border p-5'>
                <div className='flex justify-between'>
                  <p className='font-medium text-lg font-heading2 uppercase text-neutral-600'>{item.name}</p>
                  <p className='font-bold text-xl font-heading2 uppercase text-neutral-600'>${item.price.toFixed(2)}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-base font-normal text-neutral-600 pt-5'>{item.description}</p>
                  <div></div>
                </div>
                <div className='flex justify-between'>
                  <div></div>
                  <Button
                    onClick={() => handleAddToCart(item)} 
                    className='flex items-center justify-center p-3 mt-5 text-sm leading-none text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 cursor-pointer'>
                    <HiOutlineShoppingCart />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='grid py-10'>
        <p className='font-heading2 uppercase font-bold text-4xl text-neutral-700 border-zinc-300 py-10 text-center'>RICE CORNER</p>
        <ul className='grid grid-cols-2 gap-14 pt-10'>
        {items.filter(item => item.category === 'Rice').map((item) => (
            <li>
              <div className='border p-5'>
                <div className='flex justify-between'>
                  <p className='font-medium text-lg font-heading2 uppercase text-neutral-600'>{item.name}</p>
                  <p className='font-bold text-xl font-heading2 uppercase text-neutral-600'>${item.price.toFixed(2)}</p>
                </div>
                {/* <div className='flex justify-between'>
                  <p className='text-base font-normal text-neutral-600 pt-5'>{item.description}</p>
                  <p className='font-bold text-xl font-heading2 uppercase text-white'>{item.price}</p>
                </div> */}
                <div className='flex justify-between'>
                  <div></div>
                  <Button
                    onClick={() => handleAddToCart(item)} 
                    className='flex items-center justify-center p-3 mt-5 text-sm leading-none text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 cursor-pointer'>
                    <HiOutlineShoppingCart />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Products;