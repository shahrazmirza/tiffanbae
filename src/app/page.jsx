import React from 'react'
import Navbar from './Components/Navbar'
import Whatsapp from './Components/Whatsapp'
import Hero from './Components/Hero'
import { sendMail } from '../lib/mail'

export default async function Home() {
  return (
    <div className='w-screen h-screen'>
      <Navbar />
      <Whatsapp />
      <Hero />
    </div>
  )
}
