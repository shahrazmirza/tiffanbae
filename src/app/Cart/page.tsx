import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Whatsapp from "../Components/Whatsapp";
import Cart from "../Components/Cart";
import Scroll_to_top from "../Components/Scroll_to_top";
import Banner from "../Components/Banner";

const CartPage = () => {
  return (
    <div className="mh-screen">
      <Navbar />
      <Whatsapp />
      <Scroll_to_top />
      <div className="flex justify-center items-center h-96 relative">
        <div className="absolute inset-0 overflow-hidden h-96">
          <Image
            src="/assets/hero4.jpg"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10">
          <p className="font-heading1 text-6xl font-bold capitalize tracking-wider text-white leading-loose animate__animated animate__zoomIn animate__delay-1s">
            shopping cart
          </p>
        </div>
      </div>
      <Banner />
      <Cart />
    </div>
  );
};

export default CartPage;
