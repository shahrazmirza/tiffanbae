'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Image from 'next/image';
import data from '../Data/Products.json';
import Products from '../Components/Products';
import Scroll_to_top from '../Components/Scroll_to_top';
import Whatsapp from '../Components/Whatsapp';
import 'animate.css';

const Menu = () => {
  const [items, setItems] = useState([]);

    useEffect(() => {
        console.log('', data);

        if (data && data.length > 0) {
            setItems(data);
        } else {
            console.error('');
        }
    }, []); 

  return (
    <div className=''>
      <Navbar />
      <Scroll_to_top />
      <Whatsapp />
      <div className='flex justify-center items-center h-96'>
        <div className='absolute inset-0 overflow-hidden h-96'>
          <Image
            src='/assets/hero2.jpg'
            alt='Hero Image'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div>
          <p className='font-heading1 text-6xl font-bold capitalize tracking-wider text-white leading-loose animate__animated animate__zoomIn animate__delay-1s z-10'>the menu</p>
        </div>
      </div>
      
      <div className="w-screen bg-gray-200 py-1">
        <h2 className='flex flex-col md:flex-row md:text-base text-sm font-semibold justify-center text-center md:animate-marquee'>
          Place your order by 12:00 pm for pickup next day <span className='text-red-500 px-2'>OR</span> <p>Place your order by 12:00 pm this Thursday for delivery on Saturday.</p>
        </h2>
      </div>
        
      <Products />
    </div>
  )
}

export default Menu
