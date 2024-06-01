"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import data from "../Data/Products.json";
import Products from "../Components/Products";
import Scroll_to_top from "../Components/Scroll_to_top";
import Whatsapp from "../Components/Whatsapp";
import "animate.css";
import Banner from "../Components/Banner";

const Menu = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("", data);

    if (data && data.length > 0) {
      setItems(data);
    } else {
      console.error("");
    }
  }, []);

  return (
    <div className="">
      <Navbar />
      <Scroll_to_top />
      <Whatsapp />
      <div className="flex justify-center items-center h-96 relative">
        <div className="absolute inset-0 overflow-hidden h-96">
          <Image
            src="/assets/hero2.jpg"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10">
          <p className="font-heading1 text-6xl font-bold capitalize tracking-wider text-white leading-loose animate__animated animate__zoomIn animate__delay-1s">
            the menu
          </p>
        </div>
      </div>
      <Banner />
      <Products />
    </div>
  );
};

export default Menu;
