'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsChevronLeft, BsChevronRight, BsChevronDown } from 'react-icons/bs';
import 'animate.css';


const Hero = () => {
  const [currentImage, setCurrentImage] = useState('/assets/hero1.jpg');
  const images = ['/assets/hero1.jpg', '/assets/hero2.jpg', '/assets/hero3.jpg', '/assets/hero4.jpg', '/assets/hero5.jpg']; 

  const handleNextImage = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[prevIndex]);
  };

  return (
      <div className='mh-screen'>
        <div className='absolute inset-0 overflow-hidden'>
          <Image
            src={currentImage}
            alt='Hero Image'
            layout='fill'
            objectFit='cover'
          />
        </div>

        <div className='flex justify-between items-center h-screen w-screen'>
          <Link href='/' className='text-white text-6xl md:text-8xl font-light opacity-80' onClick={handlePrevImage}>
            <div className='bg-black opacity-50 w-5 md:w-16 flex text-center items-center'>
              <BsChevronLeft />
            </div>
          </Link>

          <div className='text-center z-10'>
            <p 
            className='font-heading1 text-7xl md:text-8xl md: pb-5 tracking-wider text-orange-400 animate__animated animate__fadeInUp'>Tiffan Bae</p>
            
            <p 
            className='font-heading2 text-3xl md:text-5xl text-wrap font-bold tracking-wider text-white leading-loose animate__animated animate__zoomIn animate__delay-1s'
            >SIZZLING & SCRUMPTIOUS</p>
          </div>

          <Link href='/' className='text-white text-6xl md:text-8xl font-light opacity-80' onClick={handleNextImage}>
            <div className='bg-black opacity-50 w-5 md:w-16 flex text-center items-center'>
              <BsChevronRight />
            </div>
          </Link>
        </div>
      </div>
  );
};

export default Hero;
