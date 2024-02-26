import React from 'react'
import Navbar from '../Components/Navbar'
import Image from 'next/image'
import { Container } from '@radix-ui/themes'
import Contact_Form from '../Components/Contact_Form'
import Whatsapp from '../Components/Whatsapp'

const Contact = () => {
  return (
    <div className='mh-screen'>
      <Navbar />
      <Whatsapp />
      <div className='flex justify-center items-center h-96'>
        <div className='absolute inset-0 overflow-hidden h-96'>
          <Image
            src='/assets/hero3.jpg'
            alt='Hero Image'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div>
          <p className='font-heading1 text-6xl font-bold capitalize tracking-wider text-white leading-loose animate__animated animate__zoomIn animate__delay-1s z-10'>contact us</p>
        </div>
      </div>

      <div>
        <div className='py-5'>
          <div className='pt-5 pb-5'>
            <Container>
              <Contact_Form />
            </Container>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Contact
