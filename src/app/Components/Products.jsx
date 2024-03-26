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
        size: item.size,
      });
    } else {
      signIn();
    }
  };

  return (
    <Container>
      <div className='grid'>
        <p className='font-heading2 uppercase font-bold text-3xl md:text-4xl text-neutral-700 border-zinc-300 py-20 text-center'>
          MUTTON CORNER
        </p>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-14'>
        {items.filter(item => item.category === 'mutton').map((item) => (
            <li>
              <div className='border p-5'>
                <div className='flex justify-between'>
                  <p className='font-medium text-base md:text-lg font-heading2 uppercase text-neutral-600'>
                    {item.name}
                  </p>
                  <p className='font-bold text-base md:text-xl font-heading2 uppercase text-neutral-600'>
                  ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-sm md:text-base italic font-normal text-neutral-600 pt-1'>
                    {item.size}
                  </p>
                  <div></div>
                </div>
                <div className='flex justify-between'>
                  <p className='text-sm md:text-base italic font-normal text-neutral-600 pt-1'>
                    {item.qty}
                  </p>
                  <div></div>
                </div>
                <div className='flex justify-between'>
                  <div></div>
                  <Button
                    onClick={() => handleAddToCart(item)} 
                    className='flex items-center justify-center p-3 mt-1 text-sm leading-none text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700 cursor-pointer'>
                    <HiOutlineShoppingCart />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='grid'>
        <p className='font-heading2 uppercase font-bold text-3xl md:text-4xl text-neutral-700 border-zinc-300 py-20 text-center'>
          BEEF CORNER
        </p>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-14'>
        {items.filter(item => item.category === 'beef').map((item) => (
            <li>
              <div className='border p-5'>
                <div className='flex justify-between'>
                  <p className='font-medium text-base md:text-lg font-heading2 uppercase text-neutral-600'>
                    {item.name}
                  </p>
                  <p className='font-bold text-base md:text-xl font-heading2 uppercase text-neutral-600'>
                  ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-sm md:text-base italic font-normal text-neutral-600 pt-1'>
                    {item.qty}
                  </p>
                  <div></div>
                </div>
                <div className='flex justify-between'>
                  <div></div>
                  <Button
                    onClick={() => handleAddToCart(item)} 
                    className='flex items-center justify-center p-3 mt-1 text-sm leading-none text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700 cursor-pointer'>
                    <HiOutlineShoppingCart />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='grid'>
        <p className='font-heading2 uppercase font-bold text-3xl md:text-4xl text-neutral-700 border-zinc-300 py-20 text-center'>
          CHICKEN CORNER
        </p>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-14'>
        {items.filter(item => item.category === 'chicken').map((item) => (
            <li>
            <div className='border p-5'>
              <div className='flex justify-between'>
                <p className='font-medium text-base md:text-lg font-heading2 uppercase text-neutral-600'>
                  {item.name}
                </p>
                <p className='font-bold text-base md:text-xl font-heading2 uppercase text-neutral-600'>
                ${item.price.toFixed(2)}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm md:text-base italic font-normal text-neutral-600 pt-1'>
                  {item.qty}
                </p>
                <div></div>
              </div>
              <div className='flex justify-between'>
                <div></div>
                <Button
                  onClick={() => handleAddToCart(item)} 
                  className='flex items-center justify-center p-3 mt-1 text-sm leading-none text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700 cursor-pointer'>
                  <HiOutlineShoppingCart />
                  Add to Cart
                </Button>
              </div>
            </div>
          </li>
          ))}
        </ul>
      </div>
      <div className='grid'>
        <p className='font-heading2 uppercase font-bold text-3xl md:text-4xl text-neutral-700 border-zinc-300 py-20 text-center'>
          RICE CORNER
        </p>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-14'>
        {items.filter(item => item.category === 'rice').map((item) => (
            <li>
            <div className='border p-5'>
              <div className='flex justify-between'>
                <p className='font-medium text-base md:text-lg font-heading2 uppercase text-neutral-600'>
                  {item.name}
                </p>
                <p className='font-bold text-base md:text-xl font-heading2 uppercase text-neutral-600'>
                ${item.price.toFixed(2)}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm md:text-base italic font-normal text-neutral-600 pt-1'>
                  {item.qty}
                </p>
              </div>
              <div className='flex justify-between'>
                <div></div>
                <Button
                  onClick={() => handleAddToCart(item)} 
                  className='flex items-center justify-center p-3 mt-1 text-sm leading-none text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700 cursor-pointer'>
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