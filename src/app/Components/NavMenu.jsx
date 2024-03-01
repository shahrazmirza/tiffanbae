'use client'
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { Container } from '@radix-ui/themes';
import SigninButton from '../Components/SigninButton';

const NavMenu = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container
      className={`fixed top-0 left-0 right-0 w-screen z-10 transition-transform transform ${
        isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className='text-white flex justify-between items-center h-14 pt-2'>
        <Link href='/' className='font-heading2 text-5xl font-bold tracking-wider'>
          TIFFAN BAE
        </Link>

        <div className='flex text-base'>
          <Link href='/' className='px-6 text-white hover:text-sky-600 transition-colors pt-1'>
            HOME
          </Link>

          <Link href='/Menu' className='px-6 text-white hover:text-sky-600 transition-colors pt-1'>
            MENU
          </Link>

          <Link href='/Contact' className='px-6 text-white hover:text-sky-600 transition-colors pt-1'>
            CONTACT
          </Link>

          <SigninButton />

        </div>
      </div>
    </Container>
  );
};

export default NavMenu;
