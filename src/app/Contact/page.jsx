import React from "react";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import { Container } from "@radix-ui/themes";
import ContactForm from "../Components/ContactForm";
import Whatsapp from "../Components/Whatsapp";

const Contact = () => {
  return (
    <div className="mh-screen">
      <Navbar />
      <Whatsapp />
      <div className="flex justify-center items-center h-96 relative">
        <div className="absolute inset-0 overflow-hidden h-96">
          <Image
            src="/assets/hero3.jpg"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10">
          <p className="font-heading1 text-6xl font-bold capitalize tracking-wider text-white leading-loose animate__animated animate__zoomIn animate__delay-1s">
            contact us
          </p>
        </div>
      </div>

      <div>
        <div className="py-5">
          <div className="pt-5 pb-5">
            <Container>
              <ContactForm />
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
